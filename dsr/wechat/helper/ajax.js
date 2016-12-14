const http = require('http');
const domain = require('domain');
const config = require('./../config/config');
const d = domain.create();


const ajax = (path) => {
  console.log('path: ', path);
  return new Promise((resolve, reject) => {
    d.run(() => {
      http.get({
        host: config.serverHost,
        path,
        port: config.serverPort
      }, (response) => {
        let body = '';
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          // try {
          //   const parsed = JSON.parse(body);
          //   resolve(body);
          // } catch (e) {
          //   reject(e);
          // }
          resolve(body);
        });
      });
    });
    d.on('error', () => {
      const killTimer = setTimeout(() => {
        process.exit(1);
        killTimer.unref();
      }, 3000);
      reject({
        code: 500,
        message: '服务器错误',
      });
    });
  });
};

module.exports = ajax;
