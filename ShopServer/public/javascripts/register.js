(function($) {


  /**
   * 获取表单数据
   * @return {Object} { username: '用户名', password: '密码' }
   */
  function getFormData() {
    var username = $('#username').val();
    var password = $('#password').val();
    if (!username) {
      swal('用户名不能为空', '', 'error');
      return false;
    }
    if (!password) {
      swal('密码不能为空', '', 'error');
      return false;
    }
    var data = {
      username: username,
      password: password
    };
    return data;
  }


  /**
   * 注册事件
   */
  $('#register').click(function() {
    var data = getFormData();
    if (!data) {
      return false;
    }
    var url = '/api/v0.1/register';
    $.post(url, data, function(res) {
      if (res.code === 0) {
        swal({
          title: '注册成功',
          type: 'info',
          confirmButtonText: '确定',
        }, function() {
          window.location.href = '/index';
        });
      }
    });
  });


})(jQuery);
