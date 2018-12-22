import Vue from 'vue'
import Router from 'vue-router'
import constantRouter from './constantRouter'
import asyncRouter from './asyncRouter'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 待优化，参数抽离出来
  routes: [
    {
      name: 'Login',
      // path: '/login' 请勿修改，路由判断中使用到！
      path: '/login',
      // 这里定义的路由必须设置该参数
      meta: {
        whiteList: true
      },
      component: () => import('@/views/login')
    },
    {
      path: '/404',
      meta: {
        whiteList: true
      },
      component: () => import('@/views/errorPage/404')
    },
    {
      path: '/401',
      meta: {
        whiteList: true
      },
      component: () => import('@/views/errorPage/401')
    }
  ]
})

export default router

export {
  constantRouter,
  asyncRouter
}
