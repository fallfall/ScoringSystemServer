/* eslint-disable */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql'); // node-mysql module
var myConnection = require('express-myconnection'); // express-myconnection module
var config = require('./config/config');
var dbOptions = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port,
  database: config.db.database
};

var routes = require('./routes/index');
var users = require('./routes/users');
var pageLogin = require('./routes/pageLogin');
var apiLogin = require('./routes/apiLogin');

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
// mysql
app.use(myConnection(mysql, dbOptions, 'single'));

app.use('/', routes);
app.use('/users', users);

// page
app.use('/page', pageLogin);

// api
app.use('/api', apiLogin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
