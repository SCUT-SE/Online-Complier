var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ersDatas = require('../models/ers_datas');

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/demo_oj');


mongoose.connection.on("connected",function(){
    console.log("From login.js: DB connected success.")
})

mongoose.connection.on("error",function(){
    console.log("From login.js: DB connected fail.")
})

mongoose.connection.on("disconnected",function(){
    console.log("From login.js: DB connected disconnected.")
})

router.post("/",function(req,res,next){//这个是二级路由
    // console.log(req);
    // if req from ers
    var param = {
        username:req.body.username,
        password:req.body.password,
    }
    let lginType=req.body.type;
    // if req from ees
    // console.log(param);
    // console.log(lginType);
    if(lginType){
        ersDatas.findOne(param,function(err,doc){
            if(err){
                res.json({
                    status:"1",
                    msg:err.message,
                    result:{}
                });
            }else{
                console.log(doc);
                if(doc){
                    res.cookie("userId",doc.userId,{
                        path:'/',
                        maxAge:1000*60*60
                    });
                    // req.session.user=doc;
                    // console.log(req.session);
                    res.json({
                        status:"0",
                        msg:'',
                        result:{
                            username:doc.username
                        }
                    })
                }else{
                    res.json({
                        status:"1",
                        msg:"not found",
                        result:{}
                    });
                }
            }
        })
    }
})
router.get("/",function(req,res,next){

    console.log(req);
    

    ersDatas.find({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                mesg:err.message
            })
        }
        else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
            // console.log(doc);
        }
    })
    // res.send('hello, goods list .')
})

module.exports = router;