const userList = {
  admin: {
    name: 'Super Admin',
    permission: [
      {
        Title: '配置菜单',
        Path: '/menus-1',
        Icon: 'el-icon-menu',
        Children: [
          {
            Title: '菜单1-1',
            Path: '/menus-1-1',
            Icon: 'el-icon-menu',
            Children: [
              {
                Title: '菜单-1-1',
                Path: '/menus-1-1-1',
                Icon: 'el-icon-menu'
              },
              {
                Title: '菜单-1-3',
                Path: '/menus-1-1-3',
                Icon: 'el-icon-menu'
              }
            ]
          },
          {
            Title: '菜单1-2',
            Path: '/menus-1-2',
            Icon: 'http://meiye-pre.lvshou.me/static/images/icon/icon_mendianshezhi.png'
          }
        ]
      },
      {
        Title: '组件',
        Path: '/base',
        Icon: 'el-icon-menu',
        Children: [
          {
            Title: 'Filters',
            Path: '/base/filters',
            Icon: 'el-icon-menu'
          },
          {
            Title: 'Table',
            Path: '/base/table',
            Icon: 'el-icon-menu'
          },
          {
            Title: 'Form',
            Path: '/base/form',
            Icon: 'el-icon-menu'
          }
        ]
      },
      {
        Title: '未定义菜单',
        Path: '/menus-4',
        Icon: 'el-icon-menu',
        Children: [
          {
            Title: 'Undefined',
            Path: '/menus-4-1',
            Icon: 'el-icon-menu'
          }
        ]
      }
    ]
  },
  editor: {
    name: 'Editor Admin',
    roles: 'editor'
  },
  delete: {
    name: 'Delete Admin',
    roles: 'delete'
  }
}

export default {
  login: config => {
    const { name } = JSON.parse(config.body)
    return {
      status: userList[name] ? 200 : 400,
      token: userList[name] ? name : ''
    }
  },
  logout: () => {
    return {
      states: 200,
      msg: 'success'
    }
  },
  getUserInfo: config => {
    const { token } = JSON.parse(config.body)
    return {
      status: 200,
      user: userList[token] || {}
    }
  }
}
