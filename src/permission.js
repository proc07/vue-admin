import router from './router'
import store from './store'
import { parsePath } from './utils/util'
import { getToken } from './utils/token'

const routerOptions = router.options

function extractFirstOrLastPathKey (path) {
  const segments = path.split('.')

  return {
    firstKey: segments[0],
    lastKey: segments[segments.length - 1]
  }
}

function hasRoute (routers, toPath) {
  return routers.some(route => {
    if (route.path === toPath && route.component) {
      return true
    }

    if (route.children && route.children.length) {
      return hasRoute(route.children, toPath)
    }

    return false
  })
}

router.beforeEach((to, from, next) => {
  if (getToken()) {
    const { routers } = store.getters

    if (to.path === '/login') {
      next('/')
    } else {
      if (routers.length) {
        // 检测 to 是否允许进入（如果不需要进入到401页面，可删除下方判断，直接 next）
        if ((to.meta && to.meta.whiteList) || hasRoute(routers, to.path)) {
          next()
        } else {
          next('/401')
        }
      } else {
        store.dispatch('GetUserInfo').then(res => {
          const selectRequestKey = routerOptions.selectRequestKey
          const routerOrRole = parsePath(selectRequestKey)(res)
          const { firstKey, lastKey } = extractFirstOrLastPathKey(selectRequestKey)
          const userInfo = {
            _roleId: routerOrRole
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
