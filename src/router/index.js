import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const asyncRouter = [
  {
    name: 'Menus-1',
    path: '/menus-1',
    icon: '',
    component: () => import('@/views/layout'),
    children: [
      {
        name: 'Menus-1-1',
        path: '/menus-1-1',
        icon: '',
        component: () => import('@/views/home'),
        children: [
          {
            name: '/menus-1-1-1',
            path: '/menus-1-1-1',
            icon: '',
            component: () => import('@/views/home')
          }
        ]
      },
      {
        name: 'Menus-1-2',
        path: '/menus-1-2',
        icon: '',
        component: () => import('@/views/home'),
        children: []
      }
    ]
  },
  {
    name: 'Menus-2',
    path: '/menus-2',
    icon: '',
    menuShow: true,
    component: () => import('@/views/layout'),
    children: [
      {
        name: 'Menus-2-1',
        path: '/menus-2-1',
        icon: '',
        component: () => import('@/views/home'),
        children: []
      }
    ]
  },
  {
    name: 'Menus-3',
    path: '/menus-3',
    icon: '',
    component: () => import('@/views/layout'),
    children: [
      {
        name: 'Menus-3-1',
        path: '/menus-3-1',
        icon: '',
        component: () => import('@/views/home'),
        children: []
      }
    ]
  }
]

const router = new Router({
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

router.addRoutes(asyncRouter)

export default router
