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


/**
 * 发送验证码
 * http://139.199.77.40:8080/ScoringSystemServer/Bind.do?method=sendMsg&tel=18328496343
 */
router.post('/sendMsg', (req, res) => {
  const tel = req.body.tel;
  if (!tel) {
    return res.json({
      code: 1001,
      message: '请填写电话号码',
    });
  }

  const path = `/ScoringSystemServer/Bind.do?method=sendMsg&tel=${tel}`;
  logger.debug('path: ', path);
  ajax(path)
  .then((body) => {
    logger.debug('body: ', body);
    try {
      const data = JSON.parse(body)[0];
      logger.debug('data: ', data);
      if (parseInt(data.code) === 100) {
        return res.json({
          code: 0,
          message: '发送验证码成功',
        });
      } else if (parseInt(data.code) === 101) {
        return res.json({
          code: 1002,
          message: '手机号未注册，不能进行登录',
        });
      } else {
        return res.json({
          code: 1003,
          message: '发送短信验证码失败',
        });
      }
    } catch (e) {
      logger.error(e);
      return res.json({
        code: 5000,
        message: '服务器错误',
        error: e,
      });
    }
  })
  .catch((e) => {
    return res.json({
      code: 5000,
      message: '服务器错误',
      e: JSON.stringify(e),
    });
  })
});


/**
 * 绑定手机号
 * (验证码校验及绑定) /ScoringSystemServer/Bind.do?method=VerifyTel&tel=18428360355&Vcode=004567&openId=oCqd0wwCox7mfNC2sBp1FZRxFY4Q
 */
router.post('/verifyTel', (req, res) => {
  const tel = req.body.tel;
  const vCode = req.body.code;
  const openId = req.body.openId;
  if (!tel) {
    return res.json({
      code: 1004,
      message: '电话号码不能为空',
    });
  }
  if (!vCode) {
    return res.json({
      code: 1005,
      message: '验证码不能为空',
    });
  }
  if (!openId) {
    return res.json({
      code: 1006,
      message: '请从微信进入该页面',
    });
  }
  const path = `/ScoringSystemServer/Bind.do?method=VerifyTel&tel=${tel}&Vcode=${vCode}&openId=${openId}`;
  ajax(path)
  .then((body) => {
    logger.debug('body: ', body);
    try {
      const data = JSON.stringify(body)[0];
      logger.debug('data: ', data);
      // TODO 错误处理，接口文档不全 详见 issue
      data.code = 0;
      console.log('data.code: ', data.code);
      if (data.code === 0) {
        return res.json({
          code: 0,
          message: '绑定成功',
          id: data.id,
        });
      } else if (data.code === 101){
        return res.json({
          code: 1007,
          message: '验证码错误',
        });
      } else {
        return res.json({
          code: 1008,
          message: '绑定失败，请重试',
        });
      }
    } catch (e) {
      logger.error(e);
      return res.json({
        code: 5000,
        message: '服务器错误',
        error: e,
      });
    }
  })
  .catch((e) => {
    logger.debug('e: ', e);
    return res.json({
      code: 5000,
      message: '服务器错误',
      e: JSON.stringify(e),
    });
  });
});


/**
 * 获取店主信息
 *http://139.199.77.40:8080/ScoringSystemServer/ShopKeeper.do?method=getShopkeeper&id=7
 */
router.post('/getShopkeeper', (req, res) => {
  logger.debug('获取店主信息');
  const id = req.body.id;
  if (!id) {
    return res.json({
      code: 1009,
      message: '店主id不存在',
    });
  }

  const path = `/ScoringSystemServer/ShopKeeper.do?method=getShopkeeper&id=${id}`;
  ajax(path)
  .then((body) => {
    try {
      const data = JSON.stringify(body);
      if (parseInt(data.id) > 0) {
        return res.json({
          code: 0,
          message: '查询店主信息成功',
          data: data,
        });
      } else if (parseInt(data) === -1) {
        return res.json({
          code: 1010,
          message: '该店主尚未绑定微信号',
        });
      } else {
        return res.json({
          code: 1011,
          message: '获取店主信息出错',
        });
      }
    } catch (e) {
      logger.debug('e: ', e);
      return res.json({
        code: 5001,
        message: '服务器错误',
        e: JSON.stringify(e),
      });
    }
  })
  .catch((e) => {
    logger.debug('e: ', e);
    return res.json({
      code: 5000,
      message: '服务器错误',
      e: JSON.stringify(e),
    });
  });
});


/**
 * 获取DSR列表
 */
router.get('/queryAllDsr', (req, res) => {
  const path = `/ScoringSystemServer/Dsr.do?method=queryAllDsr`;
  ajax(path)
  .then((body) => {
    try {
      const data = JSON.stringify(body);

    } catch (e) {
      logger.debug('e: ', e);
      return res.json({
        code: 1012,
        message: '获取DSR列表失败，请刷新页面重试',
        e: JSON.stringify(e),
      });
    }
  })
  .catch((e) => {
    logger.debug('e: ', e);
    return res.json({
      code: 5000,
      message: '服务器错误',
      e: JSON.stringify(e),
    });
  });
});


/**
 * 评论
 * http://139.199.77.40:8080/ScoringSystemServer/DsrScore.do?method=addComment&dsr_id=1&shopkeeper_id=5&ArriveTime=1994-9-14&major_score=1&replenishment_score=1&service_score=1&standby_score=1&Overall_score=1&comment=1
 */
router.post('/addComment', (req, res) => {
  const shopkeeperId = req.body.shopkeeperId;
  const dsrId = req.body.dsrId;
  const dsrArriveTime = req.body.dsrArriveTime;
  const sroceServe = req.body.sroceServe;
  const textServe = req.body.textServe;
  const sroceSkill = req.body.sroceSkill;
  const textSkill = req.body.textSkill;
  const sroceSupplement = req.body.sroceSupplement;
  const textSupplement = req.body.textSupplement;
  const sroceHelp = req.body.sroceHelp;
  const textHelp = req.body.textHelp;
  if(!shopkeeperId) {
    return res.json({
      code: 1013,
      message: '店主id不存在',
    });
  }
  if(!dsrId) {
    return res.json({
      code: 1014,
      message: '需要评论的DSR ID不存在',
    });
  }
  if(!dsrArriveTime) {
    return res.json({
      code: 1015,
      message: 'DSR到店日期不存在',
    });
  }
  if(!sroceServe) {
    return res.json({
      code: 1016,
      message: '服务质量分数不能为空',
    });
  }
  if(!sroceSkill) {
    return res.json({
      code: 1017,
      message: '专业技能分数不能为空',
    });
  }
  if(!sroceSupplement) {
    return res.json({
      code: 1018,
      message: '补货质量分数不能为空',
    });
  }
  if(!sroceHelp) {
    return res.json({
      code: 1019,
      message: '助销服务分数不能为空',
    });
  }

  const path = `/ScoringSystemServer/DsrScore.do?method=addComment&dsr_id=1&shopkeeper_id=5&ArriveTime=1994-9-14&major_score=1&replenishment_score=1&service_score=1&standby_score=1&Overall_score=1&comment=1`;
  ajax(path)
  .then((body) => {
    try {
      const data = JSON.stringify(body);

      return res.json({
        code: 0,
        message: '评论成功',
      });
    } catch (e) {
      logger.debug('e: ', e);
      return res.json({
        code: 1020,
        message: '评论失败',
        e: JSON.stringify(e),
      });
    }
  })
  .catch((e) => {
    logger.debug('e: ', e);
    return res.json({
      code: 5000,
      message: '服务器错误',
      e: JSON.stringify(e),
    });
  });
});


module.exports = router;
