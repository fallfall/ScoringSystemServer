(function($) {

  $('#btn').click(function() {
    var tel = $('#tel').val();
    var name = $('#name').val();
    if (!tel) {
      return swal('店主手机号不能为空', '', 'error');
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test(tel)) {
      return swal('手机号格式不正确', '', 'error');
    }
    if (!name) {
      return swal('店主姓名不能为空', '', 'error');
    }
    var data = {
      shopkeeperTel: tel,
      shopName: name,
      token: readCookie('token'),
    };
    var url = '/api/v0.1/ScoringSystemServer/ManageShopKeeper.do';
    // url += '?' + $.param(data);
    $.post(url, data, function(res) {
      console.log('res: ', res);
      if (res.code === 1200) {
        swal('添加店主成功', '', 'success');
      } else if (res.code === 1201) {
        swal('店主手机号不能为空', '', 'error');
      } else if (res.code === 1202) {
        swal('店主姓名不能为空', '', 'error');
      } else if (res.code === 1203) {
        swal('添加店主失败，请重试', '', 'error');
      } else {
        swal('添加店主失败，请重试', '', 'error');
      }
    });
  });


})(jQuery);
