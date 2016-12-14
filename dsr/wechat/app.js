var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var domain = require('domain');

var wechat = require('./routes/wechat');
var routes = require('./routes/index');
var proxy = require('./routes/proxy');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 微信初始化
app.use('/wechat', wechat);

// 路由
app.use('/', routes);
app.use('/proxy', proxy);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


process.on('uncaughtException', function(err) {
  console.error('uncaughtException ERROR: ', err);
  try {
    var killTimer = setTimeout(function() {
      process.exit(1);
    }, 30000);
    killTimer.unref();
  } catch (e) {
    console.log('error when exit', e.stack);
  }
});

// error handlers
app.use(function() {
  app.use(function(req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function(err) { // 下面抛出的异常在这里被捕获,触发此事件
      console.log('捕获到错误');
      // res.send(500, err.stack);           // 成功给用户返回了 500
      res.json({code: 500, message: '服务器错误'});
    });
    reqDomain.run(next);
  });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
