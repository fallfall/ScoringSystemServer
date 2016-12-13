// 登录页面
var express = require('express');
var router = express.Router();


/**
 * 评论页面
 * @type {String}
 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});


module.exports = router;
