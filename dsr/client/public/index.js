(function() {
  /**
   * 登录页面
    */

  /**
     * 发送ajax请求
     * @param url 链接
     * @param method http方法
     * @param data 数据
     * @param callback 回调函数
     * @return {object} callback(error, obj)
     */
  function ajax(url, method, data, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e) {
        try {
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {
          return callback(e);
        }
      }
    }

    if (xhr) {
      xhr.onreadystatechange = onReadyStateChange;

      xhr.open(method, url, true);
      if (method == 'GET') {
        // 处理 GET 请求
        xhr.send(null);
      } else {
        // POST/PUT/DELETE 等请求
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }

      // 处理服务器响应
      function onReadyStateChange() {
        console.log('xhr.readyState: ', xhr.readyState);
        console.log('xhr.status: ', xhr.status);
        console.log('xhr.responseText: ', xhr.responseText);
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var json;
            try {
              json = JSON.parse(xhr.responseText);
            } catch(e) {
              console.log('e: ', e);
              callback(e);
              return false;
            }
            // console.log('response: ', JSON.parse(xhr.responseText));
            // const response = xhr.responseText;
            callback(null, json);
          } else {
            var error = {
              status: xhr.status,
              statusText: xhr.statusText,
              timeout: xhr.timeout
            };
            callback(error);
          }
        }
      }
    } else {
      alert('您的浏览器版本过低，请升级浏览器！');
      return callback('您的浏览器版本过低，请升级浏览器！');
    }
  }

  /**
     * 发送验证码
     * @param phone
     */
  function sendCode(phone) {
    var url = '';
    var method = 'POST';
    var data = {
      phone: '18388888'
    };
    cutdown();
    ajax(url, method, data, function(err, res) {
      if (err) {
        return alert('发送验证码失败，请刷新页面重试！');
      }
      console.log('res: ', res);
      // 发送验证码成功
      return alert('发送验证码成，请注意查收短信！')
    });
  }

  // TODO 将倒计时存入 cookie
  /**
   * 验证码倒计时
   * @type {Number}
   */
  var waitTime = 60;
  function cutdown() {
    $btnSendCode = document.getElementById('btnSendCode');
    if (waitTime === 0) {
      $btnSendCode.removeAttribute('disabled');
      $btnSendCode.innerText = '获取验证码';
    } else {
      $btnSendCode.setAttribute('disabled', true);
      $btnSendCode.innerText = waitTime;
      waitTime--;
      setTimeout(function() {
        cutdown();
      }, 1000);
    }
  }

  // 发送验证码按钮
  $btnSendCode = document.getElementById('btnSendCode');
  // 监听发送验证码事件
  $btnSendCode.addEventListener('click', function() {
    console.log('$btnSendCode click...');
    var phone = document.getElementById('phone').value;
    console.log('phone: ', phone);
    if (phone.length === 0) {
      alert('请输入手机号！');
      return false;
    }
    const regPhone = /^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/;
    if (!regPhone.test(phone)) {
      alert('手机号格式错误，请重新输入！');
      return false;
    }
    sendCode();
  });

  // 登录按钮
  $btnLogin = document.getElementById('btnLogin');
  // 监听登录按钮的点击事件
  $btnLogin.addEventListener('click', function(event) {
    // 阻止元素的默认行为
    if (event.defaultPrevented) {
      event.defaultPrevented();
    } else {
      window.event.returnValue = false;
    }
  });

})();
