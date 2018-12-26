export default [
  {
    path: '',
    component: () => import('@/views/layout'),
    redirect: 'home',
    meta: {
      title: '主页',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'Home',
        meta: {
          title: 'home',
          icon: ''
        }
      },
      {
        path: 'index',
        component: () => import('@/views/home'),
        name: 'Index',
        meta: {
          title: 'index',
          icon: ''
          // 设置 roles 属性，那么就会进行权限检测
          // roles: []
        }
      }
    ]
  }
]
