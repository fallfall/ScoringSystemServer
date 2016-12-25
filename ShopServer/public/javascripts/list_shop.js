(function ($) {

  init();

  function init() {
    getShopList();
  }


  function getShopList() {
    var url = '/api/v0.1/ScoringSystemServer/ManageShopKeeper.do';
    var token = readCookie('token');
    url += '?token=' + token;
    $.get(url, function(res) {
      console.log('res: ', res);
      if (res.code === 1300) {
        var dom = '';
        res.aList.map(function(item) {
          dom += '<tr>' +
            '<td>' + item.id +'</td>' +
            '<td>' + item.ShopkeeperTel +'</td>' +
            '<td>' + item.weixing_id +'</td>' +
            '<td>' + item.shop_name +'</td>' +
            '<td>' + item.integration +'</td>' +
            '<td><a href="/edit_shop?id=' + item.id +'">操作</a></td>' +
          '</tr>';
        });
        $('#list').html(dom);
      } else if (res.code === 1701) {
        // return swal('获取所有店主失败', '', 'error');
        swal({
          title: '',
          text: '身份信息失效，请重新登录',
          type: 'error',
        }, function() {
          window.location.href = '/login';
        });
      } else {
        return swal('获取所有店主失败', '', 'error');
      }
    });
  }


})(jQuery);
