(function ($) {

  init();

  function init() {
    getShopList();
  }


  function getShopList() {
    var url = '/api/v0.1/ScoringSystemServer/Dsr.do';
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
          '</tr>';
        });
        $('#list').html(dom);
      } else {
        return swal('获取所有店主失败', '', 'error');
      }
    });
  }


})(jQuery);
