const express = require('express');

const router = express.Router();


/**
 * 首页
 *    跳转到 index
 * @type {String}
 */
router.get('/', (req, res) => {
  res.redirect('/login');
});
router.get('/index', (req, res) => {
  res.render('index', {
    title: '首页',
  });
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
 * 添加 DSR
 * @type {String}
 */
router.get('/add_dsr', (req, res) => {
  res.render('add_dsr', {
    title: '添加DSR',
  });
});


/**
 * 添加店主
 * @type {String}
 */
router.get('/add_shop', (req, res) => {
  res.render('add_shop', {
    title: '添加店主',
  });
});



module.exports = router;
