$(function () {
  // 1.1 获取剪裁区域的 DOM 元素
  const $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#file').css('display', 'none') // 隐藏文件选择
  // 绑定 上传按钮 点击事件
  $('#btn').on('click', function () {
    $('#file').click()
  })

  // 为文件选择框绑定 change 事件
  $('#file').on('change', function (e) {
    // 获取用户选择的文件
    const filelist = e.target.files
    if (filelist.length === 0) return layui.layer.msg('请选择需要上传的图片')
    // 拿到用户选择的文件
    const file = e.target.files[0]
    // 将文件转化为路径
    const imgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')
      .attr('src', imgURL) // 将路径赋值
      .cropper(options) // 重新初始化剪裁区域
  })
  // 为确认按钮绑定点击事件 上传头像
  $('#btnUpload').on('click', function () {
    // 拿到用户剪裁后的头像
    const dataURL = $image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100
      })
      .toDataURL('image/png')
    $.ajax({
      method: 'post',
      url: '/my/update/avatar',
      data: { avatar: dataURL },
      success: function (res) {
        if (res.status !== 0) return layer.msg('更换头像失败！')
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })
})
