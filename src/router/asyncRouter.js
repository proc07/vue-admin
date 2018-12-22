export default [
  {
    name: 'Menus-1',
    path: '/menus-1',
    component: () => import('@/views/layout'),
    meta: {
      title: 'title Menus-1',
      icon: '',
      roles: []
    },
    children: [
      {
        name: 'Menus-1-1',
        path: '/menus-1-1',
        component: () => import('@/views/home'),
        meta: {
          title: 'title Menus-1-1',
          roles: []
        },
        children: [
          {
            name: 'menus-1-1-1',
            path: '/menus-1-1-1',
            component: () => import('@/views/home')
          }
        ]
      },
      {
        name: 'Menus-1-2',
        path: '/menus-1-2',
        component: () => import('@/views/home'),
        children: []
      }
    ]
  },
  {
    name: 'Menus-2',
    path: '/menus-2',
    component: () => import('@/views/layout'),
    children: [
      {
        name: 'Menus-2-1',
        path: '/menus-2-1',
        component: () => import('@/views/home'),
        children: []
      }
    ]
  },
  {
    name: 'Menus-3',
    path: '/menus-3',
    component: () => import('@/views/layout'),
    children: [
      {
        name: 'Menus-3-1',
        path: '/menus-3-1',
        component: () => import('@/views/home'),
        children: []
      }
    ]
  }
]
