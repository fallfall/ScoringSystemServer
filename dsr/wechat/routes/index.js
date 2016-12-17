const http = require('http');
const express = require('express');
const OAuth = require('wechat-oauth');
const config = require('../config/config');
const wechatConfig = require('../config/wechat');
const log4js = require('./../config/log4js');
const ajax = require('./../helper/ajax');
const client = new OAuth(wechatConfig.appid, wechatConfig.appSecret);
const logger = log4js.getLogger('/routes/index');
const router = express.Router();


// 初始化路由
// 处理菜单点进来之后的操作
// 首先获取 openId
// 然后判断 openId 是否存在
//   存在，则登录成功，进入到评论页面；并把openId传递给前端
//   不存在，则进入登录页面；并把openId传递给前端
router.get('/init', function(req, res, next) {
  // 获取 openId
  // logger.debug('req: ', req);
  const code = req.query.code;
  const state = req.query.state;
  logger.debug('code: ', code);
  logger.debug('state: ', state);
  if (code === undefined) {
    logger.error('no code');
    return res.json({ code: 0 });
  }

  // 获取 openId
  client.getAccessToken(code, (err, result) => {
    if (err) {
      logger.error('获取openId失败:', err);
      return res.json({ code: 1001, error: JSON.stringify(err) });
    }

    const openId = result.data.openid;
    logger.debug('result: ', result);
    logger.debug('openId: ', openId);
    // 通过openId API 查看是否已经存在该用户
    const host = config.serverHost;
    const port = config.serverPort;
    const path = `/ScoringSystemServer/IsExitWeixin.do?openId=${openId}`;
    http.get({
      host,
      path,
      port,
    }, (response) => {
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        logger.debug('body: ', body);
        try {
          const parsed = JSON.parse(body)[0];
          logger.debug('parsed: ', parsed);
          if (parsed.code === 1000 || parsed.code === 1001) {
            if (parsed.id === -1) {
              // 数据库中 openId 不存在
              logger.debug('数据库中 openId 不存在');
              logger.debug('openId: ', openId);
              return res.render('login', {
                title: '“验证绑定手机号',
                openId,
              });
            } else {
              logger.debug('数据库中 openId 存在');
              logger.debug('openId: ', openId);
              return res.render('comment', {
                title: '评论',
                openId,
                shopkeeperId: parsed.id,
              });
            }
          } else {
            return res.render('error', {
              message: '获取用户信息失败，请重新进入',
              error: {},
            });
          }
        } catch (e) {
          return res.render('error', { message: '服务器错误', error: e });
        }
      });
    });
  });
});



// 登录（TODO delete）
router.get('/login', (req, res) => {
  const openId = req.query.openId;
  res.render('login', {
    title: '登录',
    openId: openId,
  });
});


// 评论 (TODO delete）
router.get('/comment', (req, res) => {
  const openId = req.query.openId;
  res.render('comment', {
    title: '评论',
    openId: openId,
  });
});



module.exports = router;
