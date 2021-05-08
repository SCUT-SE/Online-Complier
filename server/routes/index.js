var express = require('express');
var router = express.Router();
var oj_db = require('../models/problem_datas');

/* GET home page. */
router.get('/', function(req, res, next) {
  oj_db.find({
  },function(err,ret){
    if(err){
      console.log('查询失败');
    }else{
      console.log("题目列表")
      console.log(ret)
      res.render('index', { title: 'Express' ,problems: ret});
    }
  });
  
});

module.exports = router;
