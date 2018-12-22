import Vue from 'vue'

import './mock'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import config from './config'
import router from './router/index'
import store from './store/index'
import requestList from './request'
import './permission'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$request = requestList
Vue.prototype.$config = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
