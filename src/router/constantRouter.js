export default [
  {
    path: '',
    component: () => import('@/views/layout'),
    redirect: 'Index',
    meta: {
      title: '主页',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: '/index',
        component: () => import('@/views/home'),
        name: 'Index',
        meta: {
          title: 'Admin 介绍',
          icon: ''
          // 设置 roles 属性，那么就会进行权限检测
          // roles: []
        }
      }
    ]
  }
]
