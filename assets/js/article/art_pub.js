$(function () {
  const layer = layui.layer
  const form = layui.form

  // 初始化富文本编辑器
  tinymce.init({
    selector: '#tinydemo'
  })
  // 定义加载文章分类的方法
  initCate()
  function initCate() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) return layer.msg('文章类别加载失败！')
        let str = ''
        $.each(res.data, function (i, ele) {
          str += `<option value="${ele.name}">${ele.name}</option>`
        })
        console.log(str)
        $('[name=cate_id]').html(
          `<option value="">请选择文章类别</option>${str}`
        )
        form.render()
      }
    })
  }
})
