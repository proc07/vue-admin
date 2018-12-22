export default {
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
  },
  // 配置 sidebar 样式（目前未实现sidebarStyle[key]的检测，请勿修改）
  sidebarStyle: {
    sidebarBackgroundColor: '#2B2F39',
    menuBackgroundColor: '#333742',
    textColor: '#bfcbd9',
    activeTextColor: '#ffffff',
    activeBackgroundColor: '#30B898'
  }
}
