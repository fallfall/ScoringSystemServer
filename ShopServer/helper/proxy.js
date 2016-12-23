const http = require('http');
const querystring = require('querystring');
const config = require('./../config/config');


/**
 * 处理 GET 请求
 * @param  {object} req request
 * @param  {object} res response
 * @return {object}     response
 */
const httpGet = (req, res) => {
  const path = req.originalUrl.substring(config.apiIndex.length);
  // console.log('path: ', path);
  // console.log('url: ', req.url);
  // console.log('originalUrl: ', req.originalUrl);
  const options = {
    hostname: config.hostname,
    port: config.proxyPort,
    path,
  };
  console.log('options: ', options);
  http.get(options, (proxyRes) => {
    let body = '';
    proxyRes.on('data', (chunk) => {
      body += chunk;
    });
    proxyRes.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        res.json(parsed);
      } catch (exception) {
        console.log('httpGet parsed: ', exception);
        res.json({
          code: 5000,
          message: '服务器错误',
          error: exception,
        });
      }
    });
  });
};


/**
 * 处理除 GET 请求之外的请求
 * @param  {object} req request
 * @param  {object} res response
 * @return {object}     response
 */
const httpRequest = (req, res) => {
  const method = req.method;
  // const path = req.path.substring(config.apiIndex.length);
  const path = req.originalUrl.substring(config.apiIndex.length);
  const body = querystring.stringify(req.body);
  const options = {
    hostname: config.hostname,
    port: config.proxyPort,
    path,
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length,
    },
  };
  console.log('options: ', options);
  const proxyReq = http.request(options, (proxyRes) => {
    console.log('status: ', proxyRes.statusCode);
    console.log('headers: ', JSON.stringify(proxyRes.headers));
    let proxyBody = '';
    proxyRes.setEncoding('utf8');
    proxyRes.on('data', (chunk) => {
      console.log('chunk: ', chunk);
      proxyBody += chunk;
    });
    proxyRes.on('end', () => {
      console.log('proxyBody: ', proxyBody);
      try {
        const parsed = JSON.parse(proxyBody);
        res.json(parsed);
      } catch (exception) {
        console.log('httpRequest parsed: ', exception);
        res.json({
          code: 5000,
          message: '服务器错误',
          error: exception,
        });
      }
    });
  });

  proxyReq.on('error', (error) => {
    console.log('httpRequest error: ', error);
    return res.json({
      code: 5000,
      message: '服务器错误',
      error,
    });
  });
  console.log('body: ', body);
  proxyReq.write(body);
  proxyReq.end();
};


const proxy = (req, res, next) => {
  console.log('proxy');
  console.log('req.path: ', req.path);
  console.log('req.method: ', req.method);
  const path = req.path;
  // 如果 path 开头包含 /api/，则说明是 API 请求，则通过代理对请求进行转发
  if (path.indexOf(config.apiIndex) === 0) {
    const method = req.method;
    if (method.toLowerCase() === 'get') {
      return httpGet(req, res);
    }
    return httpRequest(req, res);
  }

  next();
};


module.exports = proxy;
