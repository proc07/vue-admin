import apiList from '@/request'
import { getToken, setToken, removeToken } from '@/utils/token'

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
    },
    LogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
