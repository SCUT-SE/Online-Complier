var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var roomDB = require('../models/room_datas');
var problemDB = require('../models/problem_datas');

/**
 * 测试用函数
 * 正式发布前务必删掉此函数
 * 清空题目数据库
 */
 router.get('/deleteall',function(req,res,next){
    roomDB.remove({}, function(err, ret) {
        if (err) {
            console.log("题目数据库清空失败")
            res.end('clear fail')
        } else {
            console.log('题目数据库清空成功');
            res.end('clear success')
        }
    });
})


router.get('/create', function (req, res, next) {
    if (req.session.user && req.session.userState === 1) {
        var publicProblemSet = []
        var myPrivateProblemSet = []
        problemDB.find({
            status: 0
        }).then(function (data, err) {
            if (err) {
                console.log('查询失败')
            }
            else {
                publicProblemSet = data
            }
            return problemDB.find({
                author_id: req.session.user._id,
                status: 1
            })
        }).then(function (data, err) {
            if (err) {
                console.log('查询失败')
            }
            else {
                myPrivateProblemSet = data
            }
            res.render('room_create', {
                publicProblems: publicProblemSet,
                myPrivateProblems: myPrivateProblemSet
            })
        })
    }
    else{
        res.json({
            status:"2",
            msg:'Insufficient permission',
            result:{}
        });
    }

});


router.get('/create/publicproblemselect', function (req, res, next) {
    var pageNum = Number(req.query.pageNum)
    var pageSize = Number(req.query.pageSize)
    var totalPageNum
    if (req.session.user && req.session.userState === 1) { //用户已登录且为面试官
        if (pageSize <= 0 || pageNum < 1) {
            res.json({
                status: '3',
                msg: 'query value error',
                result: {}
            });
        }
        else {
            problemDB.find({
                status: 0,
                author_id:{
                    $ne:req.session.user._id
                }
            }).count().then(function (data, err) {
                if (err) {
                    //console.log('查询失败')
                    res.json({
                        status: '500',
                        msg: err.message,
                        result: {}
                    });
                }
                else {
                    if (data % pageSize == 0) {
                        totalPageNum = data / pageSize
                    }
                    else {
                        totalPageNum = parseInt(data / pageSize) + 1
                    }
                    return problemDB.find({
                        status: 0,
                        author_id: {
                            $ne: req.session.user._id
                        }
                    }).limit(pageSize).skip((pageNum - 1) * pageSize)
                }
            }).then(function (data, err) {
                if (err) {
                    res.json({
                        status: '500',
                        msg: err.message,
                        result: {}
                    });
                }
                else {
                    res.json({
                        status: "1",
                        msg: '',
                        result: {
                            totalPageNum: totalPageNum,
                            problemSet: data
                        }
                    });
                    // res.render('problem_all',{
                    //     problems:data
                    // })
                }
            })
        }
    }
    else{
        res.json({
            status:"2",
            msg:'Insufficient permission',
            result:{}
        });
    }
})


router.get('/create/myproblemselect', function (req, res, next) {
    var pageNum = Number(req.query.pageNum)
    var pageSize = Number(req.query.pageSize)
    var totalPageNum
    if (req.session.user && req.session.userState === 1) { //用户已登录且为面试官
        if (pageSize <= 0 || pageNum < 1) {
            res.json({
                status: '3',
                msg: 'query value error',
                result: {}
            });
        }
        else {
            problemDB.find({
                author_id:req.session.user._id
            }).count().then(function (data, err) {
                if (err) {
                    //console.log('查询失败')
                    res.json({
                        status: '500',
                        msg: err.message,
                        result: {}
                    });
                }
                else {
                    if (data % pageSize == 0) {
                        totalPageNum = data / pageSize
                    }
                    else {
                        totalPageNum = parseInt(data / pageSize) + 1
                    }
                    return problemDB.find({
                        author_id:req.session.user._id
                    }).limit(pageSize).skip((pageNum - 1) * pageSize)
                }
            }).then(function (data, err) {
                if (err) {
                    res.json({
                        status: '500',
                        msg: err.message,
                        result: {}
                    });
                }
                else {
                    res.json({
                        status: "1",
                        msg: '',
                        result: {
                            totalPageNum: totalPageNum,
                            problemSet: data
                        }
                    });
                    // res.render('problem_all',{
                    //     problems:data
                    // })
                }
            })
        }
    }
    else{
        res.json({
            status:"2",
            msg:'Insufficient permission',
            result:{}
        });
    }
})



router.post('/create',function(req, res, next){
    if(req.session.user&&req.session.userState===1){ //用户已登录且为面试官
        var room = new roomDB({
            creator_id: req.session.user._id,
            room_name:req.body.room_name,
            problemSet:req.body.problem_select
        });
        
        room.save(function(err, data) {
            if (err) {
                // res.json({
                //     status:'500',
                //     msg:err.message,
                //     result:{}
                //});
                console.log("保存失败")
            } else {
                // res.json({
                //     status:"1",
                //     msg:'',
                //     result:{
                //         room:data
                //     }
                // });
                console.log("保存成功")
                //console.log(data)
                res.redirect('/api/room/myroom')
            }
           
        });
    }
    else{
        res.json({
            status:"2",
            msg:'Insufficient permission',
            result:{}
        });
    }
})


router.get('/myroom', function(req, res, next) {
    if(req.session.user)
    {
        roomDB.find({
            creator_id:req.session.user._id
        },function(err,data){
            if(err){
                console.log('查询失败')
                // res.json({
                //     status:'500',
                //     msg:err.message,
                //     result:{}
                // });
            }
            else{
                if(data){
                    // res.json({
                    //     status:"1",
                    //     msg:'',
                    //     result:{
                    //         roomSet:data
                    //     }
                    // });
                }
                else{
                    // res.json({
                    //     status:"0",
                    //     msg:'not found',
                    //     result:{
                    //     }
                    // });
                }
                // console.log('我的题目')
                // console.log(data)
                
                res.render('room_list',{
                    myRooms:data
                })
            }
        })
    }
    else  //用户未登录
    {
        res.json({
            status:"2",
            msg:'Insufficient permission',
            result:{
            }
        });
    }
});


router.get('/problemall',function(req,res,next){
    var room_id=req.query.rid
    roomDB.findOne({
        _id: room_id
    }, function(err, data) {
        if (err) {
            // res.json({
            //     status:'500',
            //     msg:err.message,
            //     result:{}
            // });
            console.log('查询失败');
        } else {
            if(data){
                
            }
            else{
                // res.json({
                //     status:"0",
                //     msg:'not found',
                //     result:{}
                // });
            }
            // console.log(ret)
            problemDB.find({
                _id:{"$in":data.problemSet}
            },function(err, data){
                if (err) {
                    // res.json({
                    //     status:'500',
                    //     msg:err.message,
                    //     result:{}
                    // });
                    console.log('查询失败');
                } else {
                    res.render('problem_all', {problems :data});
                }
            })
            
        }
    });
    
})

module.exports = router;