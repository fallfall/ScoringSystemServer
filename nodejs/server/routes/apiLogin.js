// 登录相关的 API
var express = require('express');
var router = express.Router();


/**
 * 发送短信 API
 *    1. 调用阿里大于发送短信
 *    2. 判断手机号是否在 store_list 中
 *    3. 发送成功后，将手机号和验证码存入数据库
 *    4. 返回发送成功
 */
router.post('/sendMsg', (req, res, next) => {
  const phone = req.body.phone;
  if (!phone) return res.json({ code: 1001, message: '电话号码未填写' });

  req.getConnection((err, connection) => {
    if (err) {
      return res.json({
        code: 5000,
        message: '数据库错误',
      });
    }

    const selectStore = 'select id from store_list where phone=?';
    connection.query(selectStore, [phone], (err, store) => {
      if (err) {
        return res.json({
          code: 5000,
          message: '数据库错误',
        });
      }

      if (store.length === 0) {
        return res.json({
          code: 1002,
          message: '该手机号对应的店主不存在',
        });
      }

      // TODO 发送短信
      //    code 1003 发送短信失败
      const code = '1122';
      const insertVerify = 'insert into verify set ?';
      const data = {
        phone,
        code,
        sendtime: new Date().getTime()
      };

      connection.query(insertVerify, (err, verify) => {
        if (err) {
          return res.json({
            code: 5000,
            message: '数据库错误',
          });
        }

        return res.json({
          code: 0,
          message: '发送短信成功'
        });
      });
    });
  });
});


/**
 * 登录 API
 * @type {String}
 */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
