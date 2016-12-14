const wechat = require('wechat');
const API = require('wechat-api');
const log4js = require('./../config/log4js');
const wechatConfig = require('../config/wechat');
const menu = require('../config/menu');
const wechatMessage = require('../config/wechatMessage');


const logger = log4js.getLogger('/routes/wechat');


// 微信的配置
const config = {
  token: wechatConfig.token,
  appid: wechatConfig.appid,
  encodingAESKey: wechatConfig.encodingAESKey,
};

// 用户关注微信的统一的回复消息
const replyMessage = wechatMessage.welcome;

// 菜单
const api = new API(wechatConfig.appid, wechatConfig.appSecret);
api.getAccessToken((err, token) => {
  logger.debug(err);
  logger.debug(token);
});

logger.debug(JSON.stringify(menu));
// 创建微信菜单
api.createMenu(JSON.stringify(menu), (err, result) => {
  logger.debug('创建微信菜单:', result);
  logger.debug('menu: ', menu);
});


const we = wechat(config)
.text((message, req, res) => {
  logger.debug('text');
  logger.debug(message);
  res.reply(replyMessage);
})
.image((message, req, res) => {
  logger.debug('image');
  logger.debug(message);
  res.reply(replyMessage);
})
.voice((message, req, res) => {
  logger.debug('voice');
  logger.debug(message);
  res.reply(replyMessage);
})
.video((message, req, res) => {
  logger.debug('video');
  logger.debug(message);
  res.reply(replyMessage);
})
.location((message, req, res) => {
  logger.debug('location');
  logger.debug(message);
  res.reply(replyMessage);
})
.link((message, req, res) => {
  logger.debug('link');
  logger.debug(message);
  res.reply(replyMessage);
})
.event((message, req, res) => {
  logger.debug('event');
  logger.debug(message);
  switch (message.Event) {
    case 'subscribe':
      logger.debug('用户关注微信号,用户的openid:===', message.FromUserName);
      res.reply(replyMessage.welcome);
      break;
    case 'unsubscribe':
      logger.debug('用户取消关注微信号===', message.FromUserName);
      break;
    default:
      res.reply(replyMessage.welcome);
  }
})
.device_text((message, req, res) => {
  logger.debug('device_text');
  logger.debug(message);
  res.reply(replyMessage.welcome);
})
.device_event((message, req, res) => {
  logger.debug('device_event');
  logger.debug(message);
  res.reply(replyMessage.welcome);
})
.middlewarify();


module.exports = we;
