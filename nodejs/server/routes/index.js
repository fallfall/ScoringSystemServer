const express = require('express');
const jwt = require('jwt-simple');
const config = require('./../config/config');

const router = new express.Router();


/**
 * 初始化路由，由微信菜单跳转而来
 *  1. 获取url中的openid
 *  2. 判断改openid是否已经成功注册
 *  3.  若注册，则生成 token 并跳转到 comment?token=x (此token中包含openid和userId)
 *  4.  若未注册，则跳转到 login?token=x (此token中只有openid, 登录成功后生成新的token)
 *
 * @param {String} openid 微信openid
 * @type {String}
 */
router.get('/init', (req, res, next) => {
  const openid = req.query.openid;
  req.getConnection((err, connection) => {
    if (err) {
      return next(err);
    }

    const selectUser = 'select id from user where openid=?';
    connection.query(selectUser, [openid], (errSelectUser, users) => {
      if (errSelectUser) {
        return next(errSelectUser);
      }

      if (users.length === 0) {
        const token = jwt.encode({ openid });
        //  跳转到 login 登录页面路由
        return res.redirect(`/page/login?token=${token}`);
      }

      const info = {
        userId: users[0].id,
        openid,
      };
      const token = jwt.encode({ info }, config.secret);
      // 跳转到 comment 页面路由
      return res.redirect(`/page/comment?token=${token}`);
    });
  });
});

module.exports = router;
