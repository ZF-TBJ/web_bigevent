$(function () {
  // layui 表单规则
  const form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) return '昵称长度为1~6个字符！'
    }
  })

  // 渲染用户信息
  initUserInfo()

  // 初始化用户信息
  function initUserInfo(res) {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) return layer.mag('获取用户信息失败！')
        // $('#username').attr('placeholder', res.data.username)
        // $('#nickname').attr(
        //   'placeholder',
        //   res.data.nickname || '请输入用户昵称'
        // )
        // $('#email').attr('placeholder', res.data.email || '请输入用户邮箱')
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 注册 重置按钮 点击事件
  $('#btnReset').on('click', function (e) {
    // 阻止默认重置行为
    e.preventDefault()
    initUserInfo()
  })

  // 监听 表单提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户头像和名称
        window.parent.getUserInfo()
      }
    })
  })
})
