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
   * 登录事件
   */
  $('#login').click(function() {
    var data = getFormData();
    if (!data) {
      return false;
    }
    var url = '/api/v0.1/login';
    $.post(url, data, function(res) {
      console.log('res: ', res);
      if (res.code === 0) {
        var token = res.token;
        swal({
          title: '登录成功',
          type: 'info',
          confirmButtonText: '确定',
        }, function() {
          window.location.href = '/index';
        });
      }
    });
  });


})(jQuery);
