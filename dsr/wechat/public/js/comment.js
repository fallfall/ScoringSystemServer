$(document).ready(function() {

  function initStorage() {
    if (!store.enabled) {
      alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
      return false;
    }
  }

  /**
   * 页面初始化
   *    初始化店主信息
   */
  function initUser() {
    var id = $('#shopKeepperId').val();
    console.log('初始化店主信息');
    if (!id) {
      return $.alert('店主信息不存在，请退出该页面并重新进入');
    }
    var url = '/proxy/getShopkeeper';
    var data = {
      id: id,
    };
    $.post(url, data, function(res) {
      console.log('初始化店主信息: ', res);
      if (res.code === 0) {
        var data = res.data;
        // 获取店主信息成功
        $('#name').text(data.name);
        $('#score').text(data.score);
        $('#shopKeepperId').text(data.id);
      } else {
        return $.alert('获取店主信息出错，请退出该页面并重新进入：' + res.message);
      }
    });
  }


  /**
   * 页面初始化
   *    初始化 Dsr 信息
   */
  function initDsr() {
    console.log('初始化 Dsr 信息');
    var url = '/proxy/queryAllDsr';
    $.get(url, function(res) {
      console.log('初始化 Dsr 信息 res: ', res);
      if (res.code === 0) {
        var data = res.data;
        var values = data.map(function(item) {
          return item.Dsr_name;
        });
        // dsr 姓名初始化
        $('#dsrname').picker({
          title: "请选择DSR姓名",
          cols: [
            {
              textAlign: 'center',
              values: values,
            }
          ]
        });
      } else {
        return $.alert('初始化DSR信息失败，请退出页面重试');
      }
    });
  }

  /**
   * 监听打分事件
   * @param  {string} id 每个需要打分的服务的ID
   * @return {null}    null
   */
  function eventScore(id) {

    $('#' + id + ' span').click(function() {
      var start = $(this).attr('value-id');
      switch (start) {
        case '1':
          $('#' + id + '_1').removeClass('hide');
          $('#' + id + '_2').addClass('hide');
          $('#' + id + '_3').addClass('hide');
          $('#' + id + '_4').addClass('hide');
          $('#' + id + ' span').removeClass('icon-star-full');
          $('#' + id + ' span').eq(0).addClass('icon-star-full');
          break;
        case '2':
          $('#' + id + '_2').removeClass('hide');
          $('#' + id + '_1').addClass('hide');
          $('#' + id + '_3').addClass('hide');
          $('#' + id + '_4').addClass('hide');
          $('#' + id + ' span').removeClass('icon-star-full');
          $('#' + id + ' span').eq(0).addClass('icon-star-full');
          $('#' + id + ' span').eq(1).addClass('icon-star-full');
          break;
        case '3':
          $('#' + id + '_3').removeClass('hide');
          $('#' + id + '_1').addClass('hide');
          $('#' + id + '_2').addClass('hide');
          $('#' + id + '_4').addClass('hide');
          $('#' + id + ' span').removeClass('icon-star-full');
          $('#' + id + ' span').eq(0).addClass('icon-star-full');
          $('#' + id + ' span').eq(1).addClass('icon-star-full');
          $('#' + id + ' span').eq(2).addClass('icon-star-full');
          break;
        case '4':
          $('#' + id + '_4').removeClass('hide');
          $('#' + id + '_1').addClass('hide');
          $('#' + id + '_2').addClass('hide');
          $('#' + id + '_3').addClass('hide');
          $('#' + id + ' span').removeClass('icon-star-full');
          $('#' + id + ' span').eq(0).addClass('icon-star-full');
          $('#' + id + ' span').eq(1).addClass('icon-star-full');
          $('#' + id + ' span').eq(2).addClass('icon-star-full');
          $('#' + id + ' span').eq(3).addClass('icon-star-full');
          break;
        case '5':
          $('#' + id + '_4').removeClass('hide');
          $('#' + id + '_1').addClass('hide');
          $('#' + id + '_2').addClass('hide');
          $('#' + id + '_3').addClass('hide');
          $('#' + id + ' span').removeClass('icon-star-full');
          $('#' + id + ' span').eq(0).addClass('icon-star-full');
          $('#' + id + ' span').eq(1).addClass('icon-star-full');
          $('#' + id + ' span').eq(2).addClass('icon-star-full');
          $('#' + id + ' span').eq(3).addClass('icon-star-full');
          $('#' + id + ' span').eq(4).addClass('icon-star-full');
          break;
        default:
          $('#' + id + '_1').addClass('hide');
          $('#' + id + '_2').addClass('hide');
          $('#' + id + '_3').addClass('hide');
          $('#' + id + '_4').addClass('hide');
          $('#' + id + ' span').removeClass('icon-star-full');
      }
    });
  }


  /**
   * dsr姓名和到店日期
   * @return {object} dsr姓名和到店日期，以及店主id
   */
  function getValue() {
    var dsrname = $('#dsrname').val();
    var date = $('#date').val();
    var shopKeepperId = $('#shopKeepperId').val();
    if (parseInt(shopKeepperId, 10) === -1) {
      return false;
    } else {
      return {
        dsrname: dsrname,
        dsrId: dsrId,
        date: date,
        shopKeepperId: shopKeepperId,
      };
    }
  }


  /**
   * 获取每项分数
   * @param  {string} id 打分的项的字符串
   * @return {obejct}    打分结果
   */
  function getScore(id) {
    var score = $('#' + id + ' span.icon-star-full').length;
    var items = $('#' + id + '_' + score + ' input[type=checkbox]:checked').map(function() {
      return $(this).val();
    }).get();
    return {
      score: score,
      items: items,
    };
  }


  /**
   * 获取整体评价
   * @return {object}  评价分数和文本
   */
  function getOverallEvaluation() {
    var score = $('#overall span.icon-star-full').length;
    var text = $('#text').val();
    return {
      score: score,
      text: text,
    };
  }

  // 初始化 localStorage
  // initStorage();
  // 到店日期 日历初始化
  $('#date').calendar();
  // 初始化 DSR 信息
  initDsr();
  // 初始化店主信息
  initUser();
  // 服务质量
  eventScore('serve');
  // 专业技能
  eventScore('skill');
  // 补货质量
  eventScore('supplement');
  // 助销服务
  eventScore('help');
  // 总体评价
  eventScore('overall');

  // 评论
  $('#next').click(function() {
    var userData = getValue();
    console.log('data: ', userData);
    if (!userData.dsrname) {
      $.toptip('请选择DSR姓名', 'warning');
      return false;
    }
    if (!userData.date) {
      $.toptip('请选择DSR到店日期', 'warning');
      return false;
    }
    if (parseInt(userData.shopKeepperId, 10) === -1) {
      $.toptip('店主信息错误，请退出重新进入该页面', 'warning');
      return false;
    }
    var sroceServe = getScore('serve');
    if (sroceServe.score === 0) {
      $.toptip('请为服务质量打分', 'warning');
      return false;
    }
    var sroceSkill = getScore('skill');
    if (sroceSkill.score === 0) {
      $.toptip('请为专业技能打分', 'warning');
      return false;
    }
    var sroceSupplement = getScore('supplement');
    if (sroceSupplement.score === 0) {
      $.toptip('请为补货质量打分', 'warning');
      return false;
    }
    var sroceHelp = getScore('help');
    if (sroceHelp.score === 0) {
      $.toptip('请为助销服务打分', 'warning');
      return false;
    }
    console.log('sroceServe: ', sroceServe);
    console.log('sroceSkill: ', sroceSkill);
    console.log('sroceSupplement: ', sroceSupplement);
    console.log('sroceHelp: ', sroceHelp);

    // 隐藏打分页面 显示总体评价页面
    //    隐藏打分页面
    $('#page_comment').addClass('hide');
    //    显示总体评价页面
    $('#page_comment_next').removeClass('hide');

    // 其他想说的
    $('#overall_btn').click(function() {
      var overallEvaluation = getOverallEvaluation();
      if (overallEvaluation.score === 0) {
        $.toptip('请对整体评价进行打分');
      }
      var data = {
        userData: userData,
        sroceServe: sroceServe,
        sroceSkill: sroceSkill,
        sroceSupplement: sroceSupplement,
        sroceHelp: sroceHelp,
        overallEvaluation: overallEvaluation,
      };
      var url = '/proxy/addComment';
      console.log('data: ', data);
      $.post(url, data, function(res){
        console.log('res: ', res);
        if (res.code === 0) {
          $.alet('评价成功');
        } else {
          $.alert(res.message, '评价失败');
        }
      });
    });
  });

});
