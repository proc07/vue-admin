export default {
  isCollapse: state => state.app.isCollapse,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  routers: state => state.permission.routers
}
