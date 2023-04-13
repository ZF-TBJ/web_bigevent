$(function () {
  const layer = layui.layer
  const form = layui.form
  // 封装获取文章列表函数
  initArtCateList()
  function initArtCateList() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) return layer.msg('更新文章列表失败！')
        // layer.msg('更新文章列表成功！')
        // console.log(res.data)
        let str = ''
        $(res.data).each(function (i, ele) {
          str += `<tr>
              <td>${ele.name}</td>
              <td>${ele.alias}</td>
              <td>
                <button type="button" class="layui-btn layui-btn-xs" id="btn_edit" data-id="${ele.Id}">
                  编辑
                </button>
                <button
                  type="button"
                  class="layui-btn layui-btn-xs layui-btn-danger btn-delete" data-id="${ele.Id}">
                  删除
                </button>
              </td>
            </tr>`
        })
        $('tbody').html(str)
      }
    })
  }

  // 添加类别 按钮 注册点击事件
  let indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog_add').html()
    })
  })

  // 通过代理为 formAdd 添加 summit 事件
  $('body').on('submit', '#formAdd', function (e) {
    e.preventDefault()
    // 发起请求添加文章分类
    $.ajax({
      method: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) return layer.msg('文章分类添加失败！')
        initArtCateList()
        layer.msg('文章分类添加成功！')
        layer.close(indexAdd)
      }
    })
  })

  // 通过代理为 btn_edit 绑定 click 事件
  let indexRe = null
  $('tbody').on('click', '#btn_edit', function () {
    // 弹出修改文章分类的层
    index = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog_re').html()
    })
    const id = $(this).attr('data-id')
    $.ajax({
      method: 'get',
      url: `/my/article/cates/${id}`,
      success: function (res) {
        form.val('formRe', res.data)
      }
    })
  })

  // 通过代理为 formRe 绑定 summit 事件
  $('body').on('submit', '#formRe', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) return layer.msg('文章分类更新失败！')
        initArtCateList()
        layer.msg('文章分类更新成功！')
        layer.close(indexRe)
      }
    })
  })

  // 通过代理为 btn-delete 绑定 click 事件
  $('body').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'get',
        url: `/my/article/deletecate/${id}`,
        success: function (res) {
          console.log(res)
          if (res.status !== 0) return layer.msg('删除失败！')
          initArtCateList()
          layer.msg('删除成功！')
          initArtCateList()
        }
      })
      layer.close(index)
    })
  })
})
