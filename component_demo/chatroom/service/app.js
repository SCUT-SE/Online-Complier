// 引入express，并获得express的实例
const express = require('express');
const path = require("path")
const app = express()
// 引入http模块
const http = require('http');
// 用http模块创建一个服务并把express的实例挂载上去
const server = http.Server(app);
// 引入socket.io并立即实例化，把server挂载上去
// const apiURL = "/api/chat/"
const io = require('socket.io')(server,{
  // path:apiURL,
});

//记录当前活跃的聊天室
// var avtiveRoom = new Map();
var activeRoom = [];

// 聊天发起人/主持人
// var hosts = []
//记录所有已经登录的用户
var userList = new Map()
app.use('/chatroom',express.static(path.join(__dirname,'/chatroom')))
// data format:
// {
//   req:"init"/"join",
//   roomId:"",
//   username:"",
// }
io.on('connection', socket =>{
  console.log("connetction on")
  socket.on("login",data => {
    // 判断，如果data在userList数组中存在，说明该用户已经登录，不允许登录
    // 如果data在userList数组中不存在，说明该用户没有登录，允许登录
    console.log(data);
    let user =userList.length!==0 ? userList.find(item => item.username === data.username):false
    if(user){
      //表示用户存在,登录失败，服务器需要给当前用户响应，告诉登录失败
      socket.emit("userExit",{msg:"用户已存在，登录失败"})
    } else {
      // 表示用户不存在,登录成功
      userList.push(data)
      socket.emit("loginsuccess",{...data,msg:"登录成功"})
      //告诉所有的用户，有用户加入到聊天室，广播消息:io.emit
      io.emit("addUser",data)
      //告诉所有的用户，目前聊天室中有多少人
      io.emit("userList",userList)
      // 把登录成功的用户名和头像存储起来
      socket.username = data.username
    }
  })
  // 用户断开连接的功能
  socket.on("disconnect",()=>{
    let roomId = socket.roomId;
    let role  = socket.req;
    console.log(socket.roomId);
    console.log(socket.req);
    if(roomId&&role){
      if(role=="init"){
        delete userList[roomId];
        delete activeRoom[activeRoom.findIndex(item => item===roomId)];
        console.log("init quit");
        console.log(userList);
        console.log(activeRoom);
        io.to(roomId).emit("info disconnect",{username:socket.username,roomId,role});
      }
      else if(role=="join"){
        // 把当前用户的信息从userList中删除掉
        let idx = userList[roomId]?userList[roomId].findIndex(item => item.username === socket.username):false;
        if(!idx)
          return;
        userList[roomId].splice(idx,1);
        console.log(userList[roomId]);
        // 告诉所有人有人离开了聊天室
        io.to(roomId).emit("leaveroom",{username:socket.username})
        // 告诉所有人，userList发生了更新
        io.to(roomId).emit("userList",userList[roomId])
      }
      
    }
    
  })
  // 监听聊天的消息
  socket.on("sendMessage",data => {
    //广播给所有用户
    console.log("send to room"+data.roomId);
    io.to(data.roomId).emit("receiveMessage",data)
  })
  // 接受图片信息
  socket.on("sendImage",data => {
    //广播给所有用户
    // console.log(data);
    io.to(data.roomId).emit("receiveImage",data)
  })

  socket.on("init",data=>{
    console.log(data);
    let user =false;
    if(user){
      //表示用户存在,登录失败，服务器需要给当前用户响应，告诉登录失败
      socket.emit("userExit",{msg:"用户已存在，登录失败"});
    } else {
      let initRoomId = Math.floor((Math.random()*1000000)+1).toString();
      // 生成随机roomId
      while(activeRoom.includes(initRoomId)){
        initRoomId = Math.floor((Math.random()*1000000)+1).toString();
      }
      activeRoom.push(initRoomId);
      // 注册用户信息
      userList[initRoomId]=[data];
      console.log(typeof(initRoomId));
      console.log(initRoomId);
      // 表示用户不存在,登录成功
      // data.roomId
      data.roomId = initRoomId;
      data.req = "init";
      // socket通信分组
      socket.join(initRoomId);
      console.log(data);
      socket.emit("loginsuccess",{...data,msg:"登录成功"});
      //告诉所有的用户，有用户加入到聊天室，广播消息:io.emit
      io.to(initRoomId).emit("addUser",data);
      //告诉所有的用户，目前聊天室中有多少人
      io.to(initRoomId).emit("userList",userList[initRoomId]);
      // 把登录成功的用户名和房间分组存储起来
      socket.username = data.username;
      socket.roomId = initRoomId;
      socket.req = "init";    
    };
  });


  socket.on("joinIn",data => {
    // 判断，如果data在userList数组中存在，说明该用户已经登录，不允许登录
    // 如果data在userList数组中不存在，说明该用户没有登录，允许登录
    console.log(data);
    // console.log(socket);
    let user =userList[data.roomId].length!==0 ? userList[data.roomId].find(item => item.username === data.username):false
    // 判断房间号是否有效
    let validGroup = activeRoom.includes(data.roomId)
    if(user||!validGroup){
      //表示用户存在,登录失败，服务器需要给当前用户响应，告诉登录失败
      socket.emit("userExit",{msg:"用户已存在/或房间号无效，登录失败"})
    }
    else {
      // 表示用户不存在,登录成功
      let roomId = data.roomId
      // userList.push(data)
      data.req = "join";
      socket.join(roomId);
      userList[data.roomId].push(data);
      console.log(data);
      socket.emit("loginsuccess",{...data,msg:"登录成功"})
      //告诉所有的用户，有用户加入到聊天室，广播消息:io.emit
      io.to(roomId).emit("addUser",data)
      //告诉所有的用户，目前聊天室中有多少人
      io.to(roomId).emit("userList",userList[data.roomId])
      // 把登录成功的用户名和头像存储起来
      socket.username = data.username
      socket.roomId = roomId;
      socket.req = "join";

    }
  })
});

server.listen(3100, function () {
  console.log('服务端启动成功！端口3100');
});