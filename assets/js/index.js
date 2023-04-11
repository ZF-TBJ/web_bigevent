$(function () {
  // 调用 getUserInfo 获取用户基本信息
  getUserInfo()

  // 注册退出事件
  $('#btnLogOut').on('click', function () {
    // layUI confirm询问
    layer.confirm(
      '确定退出登录？',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        localStorage.setItem('token', '')
        location.href = '/login.html'
        layer.close(index)
      }
    )
  })
})
// 封装函数 获取用户信息
function getUserInfo() {
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
    // headers: { Authorization: localStorage.getItem('token') || '' },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用用户头像渲染函数
      renderAvatar(res.data)
    }
    // 不论响应回来的数据是成功还是失败 都会执行 complete
    // complete: function (res) {
    //   // console.log(res.responseJSON) => {status: 1, message: '身份认证失败！'}
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // }
  })
}

// 封装用户头像渲染函数
function renderAvatar(user) {
  // 获取用户昵称/用户名
  const name = user.nickname || user.username
  $('#welcome').html(`欢迎 ${name}`)
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    // 渲染用户头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文字头像
    $('.layui-nav-img').hide()
    const first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
