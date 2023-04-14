// 在每次调用 $.post /  $.get / $.ajax 之前先调用
// ajaxPrefilter 这个函数
// 所以可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  options.url = `http://www.liulongbin.top:3007${options.url}`
  // console.log(options.url)

  // 为有权限的接口统一存储 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = { Authorization: localStorage.getItem('token') || '' }
  }

  // 全局挂载 complete 回调
  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})
