$(function () {
  const form = layui.form
  const laypage = layui.laypage
  // 定义一个查询的参数对象，将来请求数据的时候，提交到服务器
  const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认两条
    cate_id: '', // 文章发布的 id
    state: '' // 文章的发布分类
  }

  // 封装文章列表 渲染函数
  initTable()
  function initTable() {
    $.ajax({
      method: 'get',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        // console.log(res)
        let str = ''
        if (res.status !== 0) return layer.msg('获取文章列表失败！')
        console.log('获取文章列表成功')
        $.each(res.data, function (i, ele) {
          str += `
            <tr>
              <td>${ele.title}</td>
              <td>${ele.cate_name}</td>
              <td>${ele.pub_data}</td>
              <td>${ele.state}</td>
              <td>
                <button type="button" class="layui-btn layui-btn-xs">编辑</button>
                <button
                  type="button"
                  class="layui-btn layui-btn-xs layui-btn-danger btn-delete" data-id="${ele.id}">
                  删除
                </button>
              </td>
            </tr>
          `
        })
        $('tbody').html(str)
        rederPage(res.total)
      }
    })
  }

  // 初始化文章分类 函数
  initCate()
  function initCate() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function (res) {
        let str = ''
        if (res.status !== 0) return layer.msg('获取文章分类失败！')
        $.each(res.data, function (i, ele) {
          str += `
            <option value="${ele.name}">${ele.name}</option>
          `
        })
        $('[name=cate_id]').html(`<option value="">所有状态</option>${str}`)
        form.render()
      }
    })
  }

  // 注册表单 submit 事件
  $('#form_search').on('submit', function (e) {
    e.preventDefault()
    // 获取表单中选中项的值
    const cate_id = $('[name=cate_id]').val()
    const state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    initTable()
  })

  // 封装 渲染分页 函数
  function rederPage(total) {
    // 调用 laypage.render 渲染分页结构
    laypage.render({
      elem: 'pageBox', // 这里的 pageBox 是分页的容器的 ID，不用加 # 号
      count: 5, // 数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      limits: [2, 3, 4, 5, 10],
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      // jump - 切换分页的回调
      // first（是否首次，一般用于初始加载的判断）
      jump: function (obj, first) {
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        // 根据最新的 q 重新渲染文章列表
        // 首次不执行
        if (!first) {
          initTable()
        }
      }
    })
  }

  // 通过代理 注册 删除按钮 点击事件
  $('tbody').on('click', '.btn-delete', function () {
    // 获取删除按钮的个数
    let len = $('.btn-delete').length
    // 获取文章 id
    const id = $(this).attr('data-id')
    layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        method: 'get',
        url: `/my/article/delete/${id}`,
        success: function (res) {
          if (res.status !== 0) return layer.msg('删除文章失败！')
          layer.msg(' 删除文章成功！')
          // 当数据删除完成后，所处页面数据为空，但是页码值没变
          // 需要判断当前这一页中，是否还有剩余的数据
          // 如果没有了，则让页码值 -1 再重新渲染
          if (len === 1) {
            // 只有一条数据，删除之后就没有数据了
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
        }
      })
      layer.close(index)
    })
  })
})
