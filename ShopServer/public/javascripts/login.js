(function($) {


  /**
   * 获取表单数据
   * @return {Object} { tel: '手机号', code: '验证码' }
   */
  function getFormData() {
    var tel = $('#tel').val();
    var code = $('#code').val();
    if (!tel) {
      swal('手机号不能为空', '', 'error');
      return false;
    }
    if (!code) {
      swal('验证码不能为空', '', 'error');
      return false;
    }
    var data = {
      tel: tel,
      code: code
    };
    return data;
  }


  /**
   * 获取验证码事件
   */
  $('#getCode').click(function() {
    var tel = $('#tel').val();
    if (!tel) {
      swal('请输入手机号', '', 'error');
      return false;
    }
    var url = '/api/v0.1/ScoringSystemServer/ManagerLogin.do?method=sendMsg&managerTel=' + tel;
    console.log('url: ', url);
    $.get(url, function(res) {
      console.log('res: ', res);
      if (res.code === 1500) {
        swal('发送短信验证码成功，请注意查收短信', '', 'success');
      } else if (res.code === 1501) {
        swal('发送短信验证码失败，请重试', '', 'error');
      } else if (res.code === 1502) {
        swal('没有该管理员', '', 'error');
      } else if (res.code === 1503) {
        swal('发送短信验证码失败，请重试', '', 'error');
      } else if (res.code === 1504) {
        swal('手机号不能为空', '', 'error');
      } else {
        swal('发送短信验证码失败，请重试', '', 'error');
      }
    });
  });


  /**
   * 登录事件
   */
  $('#login').click(function() {
    var data = getFormData();
    if (!data) {
      return false;
    }
    var url = '/api/v0.1/ScoringSystemServer/ManagerLogin.do';
    url += '?method=vertify&managerTel='+data.tel+'&vcode='+data.code;
    $.get(url, function(res) {
      console.log('res: ', res);
      if (res.code === 1600) {
        var token = res.token;
        createCookie('token', token);
        swal({
          title: '登录成功',
          type: 'info',
          confirmButtonText: '确定',
        }, function() {
          window.location.href = '/index';
        });
      } else if (res.code === 1602) {
        swal('验证码错误', '', 'error');
      } else if (res.code === 1601) {
        swal('验证码不能为空', '', 'error');
      } else if (res.code === 1603) {
        swal('登录失败，请重试', '', 'error');
      } else if (res.code === 1504) {
        swal('手机号码不能为空', '', 'error');
      } else {
        swal('登录失败，请重试', '', 'error');
      }
    });
  });


})(jQuery);
