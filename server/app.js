var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {loginRouter} = require('./routes/login');
const usersRouter = require('./routes/users');
const shopRouter = require('./routes/shops')
const qiniRouter = require('./routes/qiniuToken')
const auth = require('./middlewares/auth');

var app = express();//创建express实例
//处理跨域问题
app.use((req, res, next) => {
  //判断路径
    if(req.path !== '/' && !req.path.includes('.')){
      res.set({
        'Access-Control-Allow-Credentials': true, //允许后端发送cookie
        'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization', //设置请求头格式和类型
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
        'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
      })
    }
    req.method === 'OPTIONS' ? res.send(200) : next()
  })
// 设置视图目录和模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//设置静态资源目录，并且加入一些中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置路由
// 处理请求
app.use('/', loginRouter);
app.use('/qiniu', qiniRouter)
app.use('/users',auth,usersRouter)
app.use('/shops',shopRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404')
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
