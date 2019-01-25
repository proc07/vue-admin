import axios from 'axios'
import { getToken } from '@/utils/token'
import { Message, MessageBox } from 'element-ui'

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_ROUTER_BASE_API,
  timeout: 5000
})

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = getToken()

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  const res = response.data
  if (res.status !== 200) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 4000
    })
    if (res.status === 501 || res.status === 502) {
      const statusMap = {
        501: '您已被登出，请重新登录',
        502: 'token 已过期，请重新登录'
      }
      MessageBox.confirm(statusMap[res.status], '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      })
    }
  }
  return res
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
