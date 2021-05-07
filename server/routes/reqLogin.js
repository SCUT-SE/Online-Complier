var express = require('express');
var router = express.Router();
var ersDatas = require('../models/ers_datas');
var eesDatas = require('../models/ees_datas');


router.post("/",function(req,res,next){
    // 获取request的数据内容
    let param = {
        username:req.body.username,
        password:req.body.password,
    }
    // 获取登录请求的角色
    let lginType=req.body.type;
    if(lginType==1){
        //1-面试官登录
        ersDatas.findOne(param,function(err,doc){
            // 数据库错误，登录失败
            if(err){
                res.json({
                    status:"0",
                    msg:err.message,
                    result:{}
                });
            }
            else{
                // 数据库请求成功
                // console.log(doc);
                if(doc){
                    // 找到匹配的数据
                    // 重要信息写入cookie和session
                    // res.cookie("userId",doc.userId,{
                    //     path:'/',
                    //     maxAge:1000*60*60
                    // });
                    // req.session.user=doc;
                    // console.log(req.session);
                    // 返回response格式，登录成功
                    res.json({
                        status:"1",
                        msg:'',
                        result:{
                            username:doc.username
                        }
                    })
                }else{
                    // 数据未匹配，登录失败
                    res.json({
                        status:"0",
                        msg:"not found",
                        result:{}
                    });
                }
            }
        })
    }
    else if(lginType==0){
        //0-普通应聘者
        eesDatas.findOne(param,function(err,doc){
            if(err){
                res.json({
                    status:"0",
                    msg:err.message,
                    result:{}
                });
            }else{
                // console.log(doc);
                if(doc){
                    // 重要信息写入cookie和session
                    // res.cookie("userId",doc.userId,{
                    //     path:'/',
                    //     maxAge:1000*60*60
                    // });
                    // req.session.user=doc;
                    // console.log(req.session);
                    res.json({
                        status:"1",
                        msg:'',
                        result:{
                            username:doc.username
                        }
                    })
                }else{
                    res.json({
                        status:"0",
                        msg:"not found",
                        result:{}
                    });
                }
            }
        })
    }
    else{
        // 用户类型错误，正常不会执行这里
        res.json({
            status:"0",
            msg:"未定义用户类型！",
            result:{}
        });
    }
})

// get for debug
router.get("/",function(req,res,next){
    console.log(req);
    ersDatas.find({},function(err,doc){
        if(err){
            res.json({
                status:'0',
                mesg:err.message
            })
        }
        else{
            res.json({
                status:'1',
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