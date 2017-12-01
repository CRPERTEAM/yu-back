export default [
  {
    path: '/content-manage/goods',
    name: 'Goods',
    component: resolve => require(['pages/content-manage/goods'], resolve),
    meta: { isMenu: true, title: '商品列表' }
  }, {
    path: '/content-manage/goods/add',
    name: 'GoodsAdd',
    component: resolve => require(['pages/content-manage/goods/add'], resolve),
    meta: { title: '商品添加' }
  }, {
    path: '/content-manage/goods/edit',
    name: 'GoodsEdit',
    component: resolve => require(['pages/content-manage/goods/edit'], resolve),
    meta: { title: '商品编辑' }
  }, {
    path: '/content-manage/goods/detail',
    name: 'GoodsDetail',
    component: resolve => require(['pages/content-manage/goods/detail'], resolve),
    meta: { title: '商品查看' }
  }
]
