const express = require('express');
const jwt = require('jwt-simple');
const router = express.Router();
const config = require('config');


/**
 * 初始化路由，由微信菜单跳转而来
 *  1. 获取url中的openid
 *  2. 判断改openid是否已经成功注册
 *  3.  若注册，则生成 token 并跳转到 comment?token=x
 *  4.  若未注册，则跳转到 login (登录成功后生成token)
 * @type {String}
 */
router.get('/init', function(req, res, next) {
  const openid = req.query.openid;
  req.getConnection((err, connection) => {
    if (err)
      return next(err);

    const selectUser = 'select id from user where openid=?';
    connection.query(selectUser, [openid], (err, users) => {
      if (err)
        return next(err);

      if (users.length === 0) {
        return res.redirect(`/login`);
      }

      const userId = users[0].id;
      const token = jwt.encode({ userId }, config.secret);
      return res.redirect(`/comment?token=${token}`);
    });
  });
});

module.exports = router;
