var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/oj');

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/demo_oj');


mongoose.connection.on("connected",function(){
    // var kiwis=new Goods({
    //     problemId:0,
    //     author:"HYH",
    //     diffic:"hard",
    //     content:"This is a test problem"
    // });
    // kiwis.save(function(error){

    // });
    console.log("From demo.js: DB connected success.")
})

mongoose.connection.on("error",function(){

    console.log("From demo.js: DB connected fail.")
})

mongoose.connection.on("disconnected",function(){

    console.log("From demo.js: DB connected disconnected.")
})

router.get("/",function(req,res,next){
    Goods.find({},function(err,doc){
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