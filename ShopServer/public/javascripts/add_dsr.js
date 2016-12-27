(function($) {

  $('#btn').click(function() {
    var dsrName = $('#dsrName').val();
    var dsrEname = $('#dsrEname').val();
    if (!dsrName) {
      return swal('DSR姓名不能为空', '', 'error');
    }
    if (!dsrEname) {
      return swal('DSR编号不能为空', '', 'error');
    }
    var data = {
      dsrName: dsrName,
      dsrEname: dsrEname,
      token: readCookie('token'),
    };
    var url = '/api/v0.1/ScoringSystemServer/ManageDsr.do';
    // url += '?' + $.param(data);
    console.log('data: ', data);
    $.post(url, data, function(res) {
      console.log('res: ', res);
      if (res.code === 1400) {
        swal('添加DSR成功', '', 'success');
      } else if (res.code === 1201) {
        swal('DSR姓名不能为空', '', 'error');
      } else if (res.code === 1202) {
        swal('DSR编号不能为空', '', 'error');
      } else if (res.code === 1203) {
        swal('添加DSR失败，请重试', '', 'error');
      } else {
        swal('添加DSR失败，请重试', '', 'error');
      }
    });
  });


})(jQuery);
