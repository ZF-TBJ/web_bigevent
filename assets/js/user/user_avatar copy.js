$(function () {
  let cropper = new Cropper($('#image')[0], {
    aspectRatio: 1 / 1, // 默认比例
    preview: '.img-preview' // 预览视图
  })

  $('#file').css('display', 'none')

  // 绑定 上传按钮 点击事件
  $('#btn').on('click', function () {
    $('#file').click()
  })

  let cropper1 = null
  // 为文件选择框绑定 change 事件
  $('#file').on('change', function (e) {
    // 获取用户选择的文件
    const filelist = e.target.files
    if (filelist.length === 0) return layui.layer.msg('请选择需要上传的图片')
    // 拿到用户选择的文件
    const file = e.target.files[0]
    // 将文件转化为路径
    const imgURL = URL.createObjectURL(file)
    // 重新初始化剪裁区域
    cropper.destroy() //销毁cropper，并在图像中将整个cropper销毁(将插件销毁)
    $('#image').attr('src', imgURL) // 将路径赋值
    // 重新 实例化 剪裁区域 cropper1
    let cropper1 = new Cropper($('#image')[0], {
      aspectRatio: 1 / 1, // 默认比例
      preview: '.img-preview' // 预览视图
    })
  })

  // 为确认按钮绑定点击事件 上传头像
  $('#btnUpload').on('click', function () {
    // 拿到用户剪裁后的头像
    // const dataURL = cropper1.getCroppedCanvas()
    // console.log(dataURL)
  })
})
