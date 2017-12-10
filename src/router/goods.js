export default [
  {
    path: '/content-manage/goods',
    name: 'Goods',
    component: resolve => require(['pages/content-manage/goods'], resolve),
    meta: { isMenu: true, title: '商品列表' }
  }, {
    path: '/content-manage/goods/detail',
    name: 'GoodsDetail',
    component: resolve => require(['pages/content-manage/goods/detail'], resolve),
    meta: { title: '商品查看' }
  }
]
