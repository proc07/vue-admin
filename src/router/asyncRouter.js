export default [
  {
    name: 'Menus-1',
    path: '/menus-1',
    redirect: 'Menus-1-2',
    component: () => import('@/views/layout'),
    meta: {
      title: '我是个被替换的title',
      icon: '',
      roles: []
    },
    children: [
      {
        name: 'Menus-1-1',
        path: '/menus-1-1',
        redirect: 'Menus-1-1-1',
        component: () => import('@/views/home'),
        children: [
          {
            name: 'Menus-1-1-1',
            path: '/menus-1-1-1',
            component: () => import('@/views/home')
          },
          {
            name: 'Menus-1-1-2',
            path: '/menus-1-1-2',
            component: () => import('@/views/home')
          }
        ]
      },
      {
        name: 'Menus-1-2',
        path: '/menus-1-2',
        component: () => import('@/views/home')
      }
    ]
  },
  {
    name: 'Components',
    path: '/base',
    component: () => import('@/views/layout'),
    children: [
      {
        name: 'Filters',
        path: '/base/filters',
        component: () => import('@/views/home/filters')
      },
      {
        name: 'Table',
        path: '/base/table',
        component: () => import('@/views/home/table')
      },
      {
        name: 'Form',
        path: '/base/form',
        component: () => import('@/views/home/form')
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
        component: () => import('@/views/home')
      }
    ]
  }
]
