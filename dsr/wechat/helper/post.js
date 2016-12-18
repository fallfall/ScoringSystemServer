const http = require('http');
const domain = require('domain');
const config = require('./../config/config');
const d = domain.create();


const post = (path, data) => {
  console.log('path: ', path);
  console.log('data: ', data);
  const postData = querystring.stringify(data);
  return new Promise((resolve, reject) => {
    d.run(() => {
      const options = {
        host: config.serverHost,
        path,
        port: config.serverPort,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };
      console.log('options: ', options);
      const req = http.request(options, (response) => {
        let body = '';
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          console.log('body: ', body);
          resolve(body);
        });
      });
      req.write(postData);
      req.end();
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

module.exports = post;
