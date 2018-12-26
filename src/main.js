import Vue from 'vue'

import './mock'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import config from './config'
import router from './router'
import store from './store'
import requestList from './request'
import './permission'
import './icons'
import './component'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$request = requestList
Vue.prototype.$config = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
