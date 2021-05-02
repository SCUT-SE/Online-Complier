var express = require('express');
var router = express.Router();
var ersDatas = require('../models/ers_datas');
var eesDatas = require('../models/ees_datas');


router.post('/',function(req,res,next){
    var param = {
        username:req.body.username,
    }
    let lginType=req.body.type;// 1-ersDatas, 0-eesDatas
    if(lginType == 1){
        ersDatas.findOne(param,function(err,doc){
            if(err){
                res.json({
                    status:"0",
                    msg:err.message,
                    result:{}
                });
            }
            else{
                if(doc){
                    var username = doc.username;
                    // 用户名重复
                    res.json({
                        status:"0",
                        msg:username+'用户名重复',
                        result:{}
                    })
                }else{
                    // 可以注册次用户名
                    // 向数据库插入用户名
                    new ersDatas(param).save(function(err,doc){
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
    else if(lginType == 0){ // 面试者
        eesDatas.findOne(param,function(err,doc){
            if(err){
                res.json({
                    status:"0",
                    msg:err.message,
                    result:{}
                });
            }
            else{
                if(doc){
                    var username = doc.username;
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
        res.json({
            status:"0",
            msg:"未定义用户类型！",
            result:{}
        });
    }
})

module.exports = router;