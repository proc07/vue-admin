import axios from 'axios'

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: '',
  timeout: 5000
})

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'

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
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
