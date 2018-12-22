import apiList from '@/request'
import { getToken, setToken } from '@/utils/token'

const user = {
  // namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    GetUserInfo () {
      return new Promise((resolve, reject) => {
        apiList.login.GetUserInfo({
          token: getToken()
        }).then(res => {
          // commit('SET_USERINFO', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
