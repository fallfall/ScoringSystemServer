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
      dsrId: QueryString.id,
      dsrName: dsrName,
      dsrEname: dsrEname,
      token: readCookie('token'),
    };
    var url = '/api/v0.1/ScoringSystemServer/ManageDsr.do';
    url += '?' + $.param(data);
    $.ajax({
      url: url,
      type: 'PUT',
      data: data,
      success: function(res) {
        console.log('res: ', res);
        if (res.code === 1600) {
          swal('修改DSR成功', '', 'success');
        } else if (res.code === 1401) {
          swal('DSR姓名不能为空', '', 'error');
        } else if (res.code === 1402) {
          swal('DSR编号不能为空', '', 'error');
        } else if (res.code === 1403) {
          swal('修改DSR失败，请重试', '', 'error');
        } else {
          swal('修改DSR失败，请重试', '', 'error');
        }
      }
    });
  });


})(jQuery);
