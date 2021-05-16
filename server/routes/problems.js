var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var problemDB = require('../models/problem_datas');

/**
 * 测试用函数
 * 正式发布前务必删掉此函数
 * 清空题目数据库
 */
router.get('/deleteall',function(req,res,next){
    problemDB.remove({}, function(err, ret) {
        if (err) {
            console.log("题目数据库清空失败")
            res.end('clear fail')
        } else {
            console.log('题目数据库清空成功');
            res.end('clear success')
        }
    });
})

/**
 * 路由：/api/problem/public
 * 功能：查找所有公开题目
 * 状态码：
 * 500-服务器错误
 * 1-查询成功
 * 3-query取值错误
 */
router.get('/public', function(req, res, next) {
    var pageNum=Number(req.query.pageNum)
    var pageSize=Number(req.query.pageSize)
    var totalPageNum
    if(pageSize<=0||pageNum<1)
    {
        res.json({
            status:'3',
            msg:'query value error',
            result:{}
        });
    }
    else{
        problemDB.find({
            status:0
        }).count().then(function(data,err){
            if(err){
                //console.log('查询失败')
                res.json({
                    status:'500',
                    msg:err.message,
                    result:{}
                });
            }
            else{
                if(data%pageSize==0){
                    totalPageNum=data/pageSize
                }
                else{
                    totalPageNum=parseInt(data/pageSize)+1
                }
                return problemDB.find({
                    status:0
                }).limit(pageSize).skip((pageNum-1)*pageSize)
            }
        }).then(function(data,err){
            if(err){
                res.json({
                    status:'500',
                    msg:err.message,
                    result:{}
                });
            }
            else{
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
  });

/**
 * 路由：/api/problem/myproblem
 * 功能：查找当前登录用户所创建的所有题目
 * 状态码：
 * 500-服务器错误
 * 1-查询成功
 * 0-查询无结果
 * 2-无权限查询
 */
  router.get('/myproblem', function(req, res, next) {
    var pageNum=Number(req.query.pageNum)
    var pageSize=Number(req.query.pageSize)
    var totalPageNum
    if(req.session.user)
    {
        problemDB.find({
            author_id:req.session.user._id
        }).count().then(function(data,err){
            if(err){
                //console.log('查询失败')
                res.json({
                    status:'500',
                    msg:err.message,
                    result:{}
                });
            }
            else{
                if(data%pageSize==0){
                    totalPageNum=data/pageSize
                }
                else{
                    totalPageNum=parseInt(data/pageSize)+1
                }
                return problemDB.find({
                    author_id:req.session.user._id
                }).limit(pageSize).skip((pageNum-1)*pageSize)
            }
        }).then(function(data,err){
            if(err){
                //console.log('查询失败')
                res.json({
                    status:'500',
                    msg:err.message,
                    result:{}
                });
            }
            else{
                res.json({
                    status: "1",
                    msg: '',
                    result: {
                        totalPageNum: totalPageNum,
                        problemSet: data
                    }
                });
                // console.log('我的题目')
                // console.log(data)
                // res.render('problem_my',{
                //     problems:data
                // })
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


/**
 * 路由：/api/problem/show?pid=xxx
 * 功能：通过pid获取题目信息
 * 状态码：
 * 500-服务器错误
 * 1-查询成功
 * 0-查询无结果
 * 2-无权限查询
 */
router.get('/show',function(req,res,next){
    var problem_id=req.query.pid
    problemDB.findOne({
        _id: problem_id
    }, function(err, data) {
        if (err) {
            res.json({
                status:'500',
                msg:err.message,
                result:{}
            });
            //console.log('查询失败');
        } else {
            if(data){
                if(data.status===1){ //如果是隐私题目
                    if(req.session.user&&req.session.user._id===data.author_id){  //只有作者可以获取题目信息
                        res.json({
                            status:"1",
                            msg:'',
                            result:{
                                problemSet:data
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
                }
                else{
                    res.json({
                        status:"1",
                        msg:'',
                        result:{
                            problemSet:data
                        }
                    });
                }
            }
            else{
                res.json({
                    status:"0",
                    msg:'not found',
                    result:{}
                });
            }
            // console.log(ret)
            //res.render('problem_detail', { problem_title: ret.title ,problem_content:ret.content});
        }
    });
    
})


router.get('/create',function(req,res,next){
    res.render('problem_create', { title: 'problem create' });
})


/**
 * 路由：/api/problem/create (post表单)
 * 功能：将题目信息存入数据库
 * 表单name：
 * 题目名称-problem_title
 * 题目正文-problem_content
 * 题目图片-image_url
 * 题目难度-difficulty
 * 题目状态（是否公开）-status
 * 
 * 状态码：
 * 500-服务器错误
 * 1-创建成功
 * 2-无权限创建
 */
router.post('/create',function(req,res,next){
    // console.log(req.body.problem_title)
    // console.log(req.body.problem_content)
    // console.log('用户信息用户信息用户信息用户信息')
    // console.log(req.session.user)
    if(req.session.user&&req.session.userState===1){ //用户已登录且为面试官
        var problem = new problemDB({
            author_id: req.session.user._id,
            title: req.body.problem_title,
            image_url:req.body.image_url,
            content: req.body.problem_content,
            difficulty:req.body.difficulty,
            status:req.body.status
        });
        
        problem.save(function(err, data) {
            if (err) {
                res.json({
                    status:'500',
                    msg:err.message,
                    result:{}
                });
            } else {
                // console.log('保存成功');
                // console.log(ret);
                res.json({
                    status:"1",
                    msg:'',
                    result:{
                        problemSet:data
                    }
                });
            }
            //res.redirect('/api/problem/myproblem')
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


/**
 * 路由：/api/problem/delete?pid=xxx
 * 功能：通过pid删除题目
 * 状态码：
 * 500-服务器错误
 * 1-查询成功
 * 0-查询无结果
 * 2-无权限查询
 */
router.get('/delete',function(req,res,next){
    var problem_id=req.query.pid
    problemDB.findOne({
        _id: problem_id
    }, function(err, data) {
        if (err) {
            res.json({
                status:'500',
                msg:err.message,
                result:{}
            });
            //console.log('查询失败');
        } else {
            if (data) {
                if (req.session.user && req.session.user._id === data.author_id) {  //只有作者可以获取题目信息
                    problemDB.remove({
                        _id: problem_id
                    }, function(err, data1) {
                        if (err) {
                            res.json({
                                status:'500',
                                msg:err.message,
                                result:{}
                            });
                        } else {
                            console.log('删除成功');
                            res.json({
                                status:"1",
                                msg:'',
                                result:{
                                    problemSet:data1
                                }
                            });
                        }
                        //res.redirect('/api/problem/myproblem')
                    });
                }
                else {
                    res.json({
                        status: "2",
                        msg: 'Insufficient permission',
                        result: {}
                    });
                }

            }
            else{
                res.json({
                    status:"0",
                    msg:'not found',
                    result:{}
                });
            }
            // console.log(ret)
            // res.render('problem_detail', { problem_title: ret.title ,problem_content:ret.content});
        }
    });
})

router.get('/edit',function(req,res,next){
    var problem_id=req.query.pid
    problemDB.findOne({
        _id: problem_id
    }, function(err, data) {
        if (err) {
            console.log('查询失败');
        } else {
            console.log('查询jieguo');
            console.log(data)
            res.render('problem_edit', { title: 'problem edit',  
                                    problem_title: data.title ,
                                    problem_content: data.content,
                                    problem_id: data._id});
        }
    });
})




/**
 * 路由：/api/problem/edit?pid=xxx (post表单)
 * 功能：将题目信息存入数据库
 * 表单name：
 * 题目名称-problem_title
 * 题目正文-problem_content
 * 题目图片-image_url
 * 题目难度-difficulty
 * 题目状态（是否公开）-status
 * 
 * 状态码：
 * 500-服务器错误
 * 1-创建成功
 * 2-无权限创建
 */
router.post('/edit',function(req,res,next){
    var problem_id=req.query.pid
    problemDB.findOne({
        _id: problem_id
    }, function(err, data) {
        if (err) {
            res.json({
                status:'500',
                msg:err.message,
                result:{}
            });
            //console.log('查询失败');
        } else {
            if (data) {
                if (req.session.user && req.session.user._id === data.author_id) {  //只有作者可以获取题目信息
                    problemDB.findByIdAndUpdate(req.query.pid, {
                        title: req.body.problem_title,
                        content: req.body.problem_content,
                        image_url:req.body.image_url,
                        difficulty:req.body.difficulty,
                        status:req.body.status
                    }, function(err, data1) {
                        if (err) {
                            //console.log('更新失败');
                            res.json({
                                status:'500',
                                msg:err.message,
                                result:{}
                            });
                        } else {
                            //console.log('更新成功');
                            res.json({
                                status:"1",
                                msg:'',
                                result:{
                                    problemSet:data1
                                }
                            });
                        }
                        //res.redirect('/api/problem/myproblem')
                    });
                }
                else {
                    res.json({
                        status: "2",
                        msg: 'Insufficient permission',
                        result: {}
                    });
                }

            }
            else{
                res.json({
                    status:"0",
                    msg:'not found',
                    result:{}
                });
            }
            // console.log(ret)
            // res.render('problem_detail', { problem_title: ret.title ,problem_content:ret.content});
        }
    });
    
    
})

module.exports = router;