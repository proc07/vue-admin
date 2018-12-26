import router from './router'
import store from './store'
import config from './config'
import { getToken } from './utils/token'

/**
 * Parse simple path.
 */
const bailRE = /[^\w.$]/
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

function extractFirstOrLastPathKey (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')

  return {
    firstKey: segments[0],
    lastKey: segments[segments.length - 1]
  }
}

function hasRoute (routers, toName) {
  return routers.some(route => {
    if (route.name === toName) {
      return true
    }

    if (route.children && route.children.length) {
      return hasRoute(route.children, toName)
    }

    return false
  })
}

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (getToken()) {
    const { routers } = store.getters

    if (to.path === '/login') {
      next('/')
    } else {
      if (routers.length) {
        // 检测 to route 是否允许进入（如果不需要进入到401页面，可删除下方判断，直接 next）
        if ((to.meta && to.meta.whiteList) || hasRoute(routers, to.name)) {
          next()
        } else {
          next('/401')
        }
      } else {
        store.dispatch('GetUserInfo').then(res => {
          const selectRequestKey = config.selectRequestKey
          const routerOrRole = parsePath(selectRequestKey)(res)
          const { firstKey, lastKey } = extractFirstOrLastPathKey(selectRequestKey)
          const userInfo = {
            _roleId: config.routerMode === 'constant' ? routerOrRole : `admin_${Math.random()}`,
            _dataKey: firstKey,
            _routerOrRoleKey: lastKey
          }
          // commit userInfo
          for (let key in res[firstKey]) {
            userInfo[key] = res[firstKey][key]
          }

          store.commit('SET_USERINFO', userInfo)
          // add vuex
          store.dispatch('GenerateRoutes', routerOrRole).then((resRouter) => {
            router.addRoutes(resRouter)
            next({ ...to, replace: true })
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  } else {
    if (to.meta && to.meta.whiteList) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
