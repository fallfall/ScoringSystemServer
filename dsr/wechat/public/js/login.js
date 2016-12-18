(function() {
  /**
   * 绑定页面
    */

  // 初始化 localStorage
  init();
  function init() {
    if (!store.enabled) {
      $.alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
      return false;
    }
  }


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
            } catch (e) {
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
      $.alert('您的浏览器版本过低，请升级浏览器！');
      return callback('您的浏览器版本过低，请升级浏览器！');
    }
  }

  /**
     * 发送验证码
     * @param phone
     */
  function sendCode(phone) {
    var url = '/proxy/sendMsg';
    var method = 'POST';
    var data = {
      tel: phone,
    };
    cutdown();
    ajax(url, method, data, function(err, res) {
      if (err) {
        $.alert('发送验证码失败，请刷新页面重试！');
        return false;
      }
      console.log('res: ', res);
      if (parseInt(res.code) === 0) {
        // 发送验证码成功
        // $.alert('发送验证码成，请注意查收短信！')
        $.alert('发送验证码成，请注意查收短信！');
        return true;
      } else {
        $.alert(res.message);
        return false;
      }
    });
  }

  /**
   * 获取输入框的数据
   *  用于绑定
   * @return {object} {phone, code}
   */
  function getValue() {
    var phone = document.getElementById('phone').value;
    var code = document.getElementById('code').value;
    var openId = document.getElementById('openId').value;
    var regPhone = /^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/;
    if (!regPhone.test(phone)) {
      $.alert('手机号格式错误，请重新输入！');
      return false;
    }
    if (!code) {
      $.alert('请输入验证码！');
    }
    return {tel: phone, code: code, openId: openId};
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
    console.log('phone: ', phone.length);
    if (phone.length === 0) {
      $.alert('请输入手机号！');
      return false;
    }
    var regPhone = /^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/;
    if (!regPhone.test(phone)) {
      $.alert('手机号格式错误，请重新输入！');
      return false;
    }
    sendCode(phone);
  });

  // 绑定按钮
  $btnLogin = document.getElementById('btnLogin');
  // 监听绑定按钮的点击事件
  $btnLogin.addEventListener('click', function(event) {
    if (event.defaultPrevented) {
      // 阻止元素的默认行为
      event.defaultPrevented();
    } else {
      $.showLoading('绑定中...');
      window.event.returnValue = false;
      console.log('绑定...');
      var url = '/proxy/verifyTel';
      var data = getValue();
      console.log('data: ', data);
      ajax(url, 'POST', data, function(err, res) {
        if (err) {
          return $.alert('绑定失败，请刷新页面重试！');
        }
        console.log('res: ', res);
        if (res.code === 0) {
          // $.alert('绑定成功');
          // $.toptip('绑定成功!', 'success');
          // 将 openId 和 id 存入 cookie
          var openId = document.getElementById('openId').value;
          var id = res.id;
          store.set('openId', openId);
          store.set('id', id);
          console.log('openId: ', store.get('openId'));
          console.log('id: ', store.get('id'));
          // 跳转到评论页
          window.location.href = '/comment?openId=' + openId + '&id=id';
          $.hideLoading();
        } else {
          $.hideLoading();
          return $.alert(res.message);
        }
      });
    }
  });

})();
