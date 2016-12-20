const express = require('express');

const router = express.Router();

/**
 * 首页
 *    跳转到登录页
 * @type {String}
 */
router.get('/', (req, res) => {
  res.redirect('/login');
});


/**
 * 登录页
 * @type {String}
 */
router.get('/login', (req, res) => {
  res.render('login', {
    title: '登录',
  });
});


/**
 * 注册页
 * @type {String}
 */
router.get('/register', (req, res) => {
  res.render('register', {
    title: '注册',
  });
});

module.exports = router;
