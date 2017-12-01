import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Index from 'pages/index.vue'
import Goods from './goods'

Vue.use(Router)

let curRoutes = [
  {
    path: '/signin',
    component: resolve => require(['pages/signin.vue'], resolve),
    name: 'Signin',
    meta: { hidden: true }
  }, {
    path: '/',
    component: Index,
    name: 'Index',
    meta: { hidden: true, title: '首页' }
  }, {
    path: '/404',
    component: resolve => require(['pages/error-pages/404.vue'], resolve),
    meta: { hidden: true }
  }
]

const router = new Router({
  routes: curRoutes
})

let afterRoutes = [
  {
    path: '/content-manage',
    component: Index,
    redirect: '/content-manage/articles',
    name: 'ContentManage',
    meta: { isMenu: true, title: '内容管理', iconCls: 'el-icon-menu' },
    children: [
      ...Goods,
      {
      //   path: '/contentManage/detail',
      //   name: 'CMDetail',
      //   component: resolve => require(['pages/contentManage/detail.vue'], resolve),
      //   meta: { title: '详情页' }
      // }, {
      //   path: '/contentManage/articleAdd',
      //   name: 'CMArticleAdd',
      //   component: resolve => require(['pages/contentManage/articleAdd.vue'], resolve),
      //   meta: { title: '文章添加' }
      // }, {
      //   path: '/contentManage/articles',
      //   name: 'CMArticles',
      //   component: resolve => require(['pages/contentManage/articles.vue'], resolve),
      //   meta: { isMenu: true, title: '文章列表' }
      // }, {
      //   path: '/content-manage/files',
      //   name: 'CMFiles',
      //   component: resolve => require(['pages/content-manage/files.vue'], resolve),
      //   meta: { isMenu: true, title: '文件管理' }
      // }, {
        path: '/content-manage/goods-type',
        name: 'GoodsType',
        component: resolve => require(['pages/content-manage/goods-type'], resolve),
        meta: { isMenu: true, title: '商品类型列表' }
      }, {
        path: '/content-manage/order',
        name: 'Order',
        component: resolve => require(['pages/content-manage/order'], resolve),
        meta: { isMenu: true, title: '订单列表' }
      }
    ]
  }, {
    path: '/system-manage',
    redirect: '/system-manage/userinfo',
    name: 'SystemManage',
    component: Index,
    meta: { isMenu: true, title: '系统管理', iconCls: 'el-icon-setting' },
    children: [{
      path: '/system-manage/userinfo',
      name: 'SMUserinfo',
      component: resolve => require(['pages/system-manage/userinfo.vue'], resolve),
      meta: { isMenu: true, title: '用户信息' }
    }]
  }, {
    path: '*',
    redirect: '/404'
  }
]

// 不需要重定向的白名单
const whiteList = ['/signin']

// 重定向判断，判断用户是否有访问该页面的权限
router.beforeEach(async (to, from, next) => {
  console.log(router)
  let token = store.getters.token
  if (token) {
    if (to.path === '/signin') {
      next({ name: 'Index' })
    } else {
      if (store.getters.roles.length === 0) {
        // 此处去获取权限相关的信息
        await store.dispatch('getUserInfo', token)
        router.addRoutes(afterRoutes)
        await store.dispatch('setRoutes', afterRoutes)
        next(to.path)
      } else {
        // 无动态改变权限，此处之前next
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ name: 'Signin' })
    }
  }
})

export default router
