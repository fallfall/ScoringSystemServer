(function ($) {

  init();

  function init() {
    getShopList();
  }


  function getShopList() {
    var url = '/api/v0.1/ScoringSystemServer/Dsr.do';
    var token = readCookie('token');
    url += '?method=queryAllDsr&token=' + token;
    $.get(url, function(res) {
      console.log('res: ', res);
      if (parseInt(res.code, 10) === 1) {
        var data = JSON.parse(res.data);
        var dom = '';
        data.map(function(item) {
          dom += '<tr>' +
            '<td>' + item.id +'</td>' +
            '<td>' + item.Dsr_name +'</td>' +
            '<td>' + item.Dsr_Ename +'</td>' +
          '</tr>';
        });
        $('#list').html(dom);
      } else {
        return swal('获取所有DSR失败', '', 'error');
      }
    });
  }


})(jQuery);
