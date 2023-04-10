// 在每次调用 $.post /  $.get / $.ajax 之前先调用
// ajaxPrefilter 这个函数
// 所以可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  options.url = `http://www.liulongbin.top:3007${options.url}`
  // console.log(options.url)
})
