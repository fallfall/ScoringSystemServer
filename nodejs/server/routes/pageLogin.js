// 登录页面
const express = require('express');
const jwt = require('jwt-simple');
const config = require('./../config/config');


const router = new express.Router();


/**
 * 登录页面
 * @param {String} token token里面包含用户的微信openid
 * @type {String}
 */
router.get('/login', (req, res, next) => {
  const token = req.query.token;
  const openid = jwt.decode(token, config.secret);
  if (!openid) {
    console.log('[ERROR] 没有openid，提示用户从微信登录');
    console.log('token: ', token);
    return next('请从微信登录');
  }

  res.render('login', { title: '登录' });
});


module.exports = router;
