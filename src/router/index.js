import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      path: '',
      component: () => import('@/views/layout'),
      redirect: 'home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/home'),
          name: 'Home',
          meta: {}
        }
      ]
    }
  ]
})
