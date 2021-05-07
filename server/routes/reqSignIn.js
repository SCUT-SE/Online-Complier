var express = require('express');
var router = express.Router();
var ersDatas = require('../models/ers_datas');
var eesDatas = require('../models/ees_datas');


router.post('/',function(req,res,next){
    // 获取用户注册信息
    let param = {
        username:req.body.username,
        password:req.body.password,
    }
    // 获取用户类型
    let lginType=req.body.type;// 1-ersDatas, 0-eesDatas
    if(lginType == 1){
        // 检查用户id是否重复
        ersDatas.findOne({username:param.username},function(err,doc){
            // 数据库错误
            if(err){
                res.json({
                    status:"0",
                    msg:err.message,
                    result:{}
                });
            }
            else{
                // 数据库请求成功
                if(doc){
                    let username = doc.username;
                    // 用户名重复，注册失败，返回信息
                    res.json({
                        status:"0",
                        msg:username+'用户名重复',
                        result:{}
                    })
                }else{
                    // 可以注册此用户名
                    // 向数据库插入用户名
                    new ersDatas(param).save(function(err,doc){
                        if(err){
                        // 数据库错误
                            res.json({
                                status:"0",
                                msg:err.message,
                                result:{}
                            });
                        }
                        else{
                            // 注册成功
                            res.json({
                                status:"1",
                                msg:param.username+"注册成功",
                                result:{}
                            });
                        }
                    })
                }
            }
        })
    }
    else if(lginType == 0){ 
        // 面试者
        eesDatas.findOne({username:param.username},function(err,doc){
            if(err){
                res.json({
                    status:"0",
                    msg:err.message,
                    result:{}
                });
            }
            else{
                if(doc){
                    let username = doc.username;
                    // 用户名重复
                    res.json({
                        status:"0",
                        msg:username+'用户名重复',
                        result:{}
                    })
                }else{
                    // 可以注册次用户名
                    // 向数据库插入用户名
                    new eesDatas(param).save(param,function(err,doc){
                        if(err){
                            res.json({
                                status:"0",
                                msg:err.message,
                                result:{}
                            });
                        }
                        else{
                            res.json({
                                status:"1",
                                msg:param.username+"注册成功",
                                result:{}
                            });
                        }
                    })
                }
            }
        })
    }
    else{
        // 用户类型错误，正常不执行这里
        res.json({
            status:"0",
            msg:"未定义用户类型！",
            result:{}
        });
    }
})

module.exports = router;