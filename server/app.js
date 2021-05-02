var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let session = require('express-session');
var logger = require('morgan');
var goods = require('./routes/demo_oj');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose')

//login and sign in
var loginRouter = require('./routes/reqLogin')
var signInRouter = require('./routes/reqSignIn')
// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/demo_oj');

mongoose.connection.on("connected",function(){
    console.log("DB connected success.")
})

mongoose.connection.on("error",function(){
    console.log("DB connected fail.")
})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
    maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 所有路由都在这里定义：
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demo_oj', goods);
app.use('/api/reqLogin',loginRouter);
app.use('/api/reqSignIn',signInRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
