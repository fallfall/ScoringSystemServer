/**
 * 获取cookie
 * @param  {string} c_name cookie名称
 * @return {string}        cookie
 */
function getCookie(c_name) {
  console.log('c_name: ', c_name + '=');
  // console.log('document.cookie.length: ', document.cookie.length);
  // console.log('document.cookie: ', document.cookie, document.cookie.indexOf('token='));
  if (document.cookie.length > 0) {
    var c_start = document.cookie.lastIndexOf(c_name + '=');
    console.log('c_start: ', c_start);
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1)
        c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}


/**
 * 设置cookie
 * @param {string} c_name     cookie名称
 * @param {string} value      cookie的值
 * @param {string} expiredays 过期天数
 */
function setCookie(c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}


/**
 * 检测某个cookie是否存在
 * @param  {string} c_name cookie名称
 * @return {boolean}        是否存在cookie
 */
function checkCookie(c_name) {
  console.log('c_name: ', c_name);
  var name = getCookie(c_name);
  console.log('name: ', getCookie('token'));
  if (name != null && name != '') {
    return true;
  } else {
    return false;
  }
}


/**
 * 删除cookie
 * @param  {string} name cookie的名称
 * @return {null}      null
 */
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


/**
 * 退出登录
 *    删除cookie中的token
 *    跳转到登录页面
 * @return {null} null
 */
 $('#logout').click(function() {
   deleteCookie('token');
   window.location.href = '/login';
 });
