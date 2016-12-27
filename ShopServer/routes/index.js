const express = require('express');
const querystring = require('querystring');
const ajax = require('./../helper/ajax');

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


/**
 * 店主列表
 */
router.get('/list_shop', (req, res) => {
  res.render('list_shop', {
    title: '店主列表',
  });
});


/**
 * DSR列表
 */
router.get('/list_dsr', (req, res) => {
  res.render('list_dsr', {
    title: '店主列表',
  });
});


/**
 *修改奖品信息
 */
router.get('/offers_set', (req, res) => {
  res.render('offers_set', {
    title: '修改奖品信息',
  });
});


/**
 * 删除店主
 */
router.get('/delete_shop', (req, res) => {
  const id = parseInt(req.query.id, 10);
  const token = req.query.token;
  if (!(token && id)) {
    return res.redirect('/login');
  }
  const data = {
    shopkeeperId: id,
    token: token,
  };
  const formData = querystring.stringify(data);
  let path = '/ScoringSystemServer/ManageShopKeeper.do?';
  path += formData;
  const method = 'delete';
  ajax(path, method, data)
  .then((json) => {
    console.log('json: ', json);
    try {
      const result = JSON.parse(json);
      if (result.code === 1100) {
        return res.redirect('/list_shop');
      } else {
        // const message = '删除失败，服务器错误，请重试';
        // return res.redirect(`/error?message=${message}`);
        return res.redirect('/list_shop');
      }
    } catch (e) {
      // const message = '删除失败，服务器错误，请重试';
      // return res.redirect(`/error?message=${message}`);
      return res.redirect('/list_shop');
    }

  }).catch((error) => {
    // const message = '删除失败，服务器错误，请重试';
    // res.redirect(`/error?message=${message}`);
    return res.redirect('/login');
  });
});


/**
 * 删除DSR
 */
router.get('/delete_dsr', (req, res) => {
  const id = parseInt(req.query.id, 10);
  const token = req.query.token;
  if (!(token && id)) {
    return res.redirect('/login');
  }
  const data = {
    dsrId: id,
    token: token,
  };
  const formData = querystring.stringify(data);
  let path = '/ScoringSystemServer/ManageDsr.do?';
  path += formData;
  const method = 'delete';
  ajax(path, method, data)
  .then((json) => {
    console.log('json: ', json);
    try {
      const result = JSON.parse(json);
      if (result.code === 1500) {
        return res.redirect('/list_dsr');
      } else {
        // const message = '删除失败，服务器错误，请重试';
        // return res.redirect(`/error?message=${message}`);
        return res.redirect('/list_dsr');
      }
    } catch (e) {
      // const message = '删除失败，服务器错误，请重试';
      // return res.redirect(`/error?message=${message}`);
      return res.redirect('/login');
    }

  }).catch((error) => {
    console.log('error: ', error);
    const message = '删除失败，服务器错误，请重试';
    res.redirect(`/error?message=${message}`);
  });
});


/**
 * 修改DSR
 */
 router.get('/edit_dsr', (req, res) => {
   const id = parseInt(req.query.id, 10);
   const token = req.query.token;
   const name = req.query.name;
   const code = req.query.code;
   if (!(token && id && name && code)) {
     return res.redirect('/login');
   }
   res.render('edit_dsr', {
     title: '修改DSR',
     name: name,
     code: code
   });
 });


/**
 * 失败页面
 */
router.get('/error', (req, res) => {
  const message = req.query.message ? req.query.message : '操作失败，请重试';
  res.render('error', {
    title: '操作失败',
    message: message,
    error: {},
  });
});

module.exports = router;
