// 所有 url 都跳转到 /wechat 这个路由
//    然后根据 code 去进行路由处理
const OAuth = require('wechat-oauth');
const config = require('./config');
const wechatConfig = require('./wechat');


const client = new OAuth(wechatConfig.appid, wechatConfig.appSecret);


// 评论
const comment = client.getAuthorizeURL(`${config.url}/init`, 'news', 'snsapi_base');


const menu = {
  button: [
    {
      name: '点击评价',
      type: 'view',
      url: comment,
    },
  ],
};


module.exports = menu;
