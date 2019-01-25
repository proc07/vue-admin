import Vue from 'vue'
import Router from 'vue-router'
import constantRouter from './constantRouter'
import asyncRouter from './asyncRouter'

Vue.use(Router)

const options = {
  /*
   * 路由挂载模式
   * constant: 可配置路由 meta.roles 参数是否开启权限模式
   * async: 定义的路由都带有权限模式
   */
  routerMode: 'async',
  /*
   * 接口返回的数据:
   * async情况：选择路由对象数据
   * constant情况：选择 meta.roles 定义中的角色数据
   */
  selectRequestKey: 'user.permission',
  // 映射请求接口的 router 4个key值
  mapRequestKey: {
    path: 'Path',
    icon: 'Icon',
    title: 'Title',
    children: 'Children'
  }
}

const router = new Router({
  ...options,
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
