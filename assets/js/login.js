$(function () {
  // 点击去注册
  $('#link_reg').on('click', function () {
    $('.login').hide()
    $('.reg').show()
  })

  // 点击去登录
  $('#link_login').on('click', function () {
    $('.reg').hide()
    $('.login').show()
  })

  // 从layUI 获取 form 对象
  const form = layui.form
  // 通过 form.verify 自定义校验规则
  form.verify({
    // 密码校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 确认密码校验 value：表单的值
    repwd: function (value) {
      const pwd = $('#reg_password').val()
      if (value !== pwd) {
        return '两次密码输入不一致'
      }
    }
  })

  // 注册表单 submit事件
  const layer = layui.layer
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.post(
      '/api/reguser',
      {
        username: $('#reg_username').val(),
        password: $('#reg_password').val()
      },
      function (res) {
        // 判断注册成功/失败
        if (res.status !== 0) {
          const msg = res.message
          return layer.msg(msg)
        }
        layer.msg('注册成功,请登录！', { icon: 1 })
        // 注册成功自动点击 去登录
        $('#link_login').click()
      }
    )
  })
  // 登录表单 submit事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.post(
      '/api/login',
      {
        username: $('#username').val(),
        password: $('#password').val()
      },
      function (res) {
        // 判断注册成功/失败
        if (res.status !== 0) {
          const msg = res.message
          return layer.msg(msg)
        }
        layer.msg('登录成功！', { icon: 1 })
        // 登录这个之后将token 存到本地
        localStorage.setItem('token', res.token)
        // 登录成功跳转到 主页
        location.href = '/index.html'
      }
    )
  })
})
