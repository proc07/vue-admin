import { constantRouter, asyncRouter } from '@/router'
import { isExistArray } from '@/utils/util'
import config from '@/config'
import store from '@/store'

const CONSTANT_MODE = 'constant'
const ASYNC_MODE = 'async'
const MAP_PATH = config.mapRequestKey.path || ''
const MAP_ICON = config.mapRequestKey.icon || ''
const MAP_TITLE = config.mapRequestKey.title || ''
const MAP_CHILDREN = config.mapRequestKey.children || ''

// 过滤掉非当前用户访问的路由
function filterConstantRouter (cRouter, roleId) {
  let i
  const resRouter = []

  for (i = 0; i < cRouter.length; i++) {
    let router = cRouter[i]

    if (
      !router.meta ||
      (router.meta && (isRoles(router.meta.roles, roleId) || !router.meta.roles))
    ) {
      if (isExistArray(router.children)) {
        router.children = filterConstantRouter(router.children, roleId)
      }
      resRouter.push(router)
    }
  }

  return resRouter
}

function isRoles (roles, roleId) {
  // roleId exist，check children
  return roles && roles.indexOf(roleId) !== -1
}

// router 进行合并
function generateRoutes (requestRouter, asyncRouter) {
  const resRouter = []

  for (let reqRoute of requestRouter) {
    let mRouter = mergeRoutes(reqRoute, asyncRouter)

    if (!mRouter) {
      // 未完成
      mRouter = createRouter(reqRoute)
    }
    resRouter.push(mRouter)
  }
  return resRouter
}

function createRouter (router) {
  const resRouter = {
    path: router[MAP_PATH],
    meta: {
      title: router[MAP_TITLE],
      icon: router[MAP_ICON],
      roles: [store.getters.userInfo._roleId]
    },
    children: []
  }

  if (router[MAP_CHILDREN] && router[MAP_CHILDREN].length) {
    router[MAP_CHILDREN].forEach(route => {
      resRouter.children.push(createRouter(route))
    })
  }

  return resRouter
}

function mergeRoutes (reqRouter, aRouters) {
  for (let aRouter of aRouters) {
    // config extract key
    if (aRouter.path === reqRouter[MAP_PATH]) {
      aRouter.meta.icon = reqRouter[MAP_ICON]
      aRouter.meta.title = reqRouter[MAP_TITLE]
      aRouter.meta.roles.push(store.getters.userInfo._roleId)
      if (reqRouter[MAP_CHILDREN] && reqRouter[MAP_CHILDREN].length) {
        reqRouter[MAP_CHILDREN].forEach(child => {
          mergeRoutes(child, aRouter.children)
        })
      }
      return aRouter
    }
  }
}

// 补全 router 对象中的 meta 属性
function normalAsyncRouterMeta (routers) {
  routers.forEach(router => {
    const META_TEMPLATE = {
      title: '',
      icon: '',
      roles: []
    }

    if (!router.meta) {
      router.meta = META_TEMPLATE
    } else {
      router.meta = Object.assign({}, META_TEMPLATE, router.meta)
    }

    if (isExistArray(router.children)) {
      normalAsyncRouterMeta(router.children)
    }
  })
}

const permission = {
  state: {
    routers: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes ({ commit }, routerOrRole) {
      return new Promise(resolve => {
        let resRouter = []

        if (config.routerMode === ASYNC_MODE) {
          // normal router.meta
          normalAsyncRouterMeta(asyncRouter)
          // merge request or async router
          const filterRouter = generateRoutes(routerOrRole, asyncRouter)
          resRouter = resRouter.concat(constantRouter, filterRouter)
        } else if (config.routerMode === CONSTANT_MODE) {
          resRouter = filterConstantRouter(constantRouter, routerOrRole)
        }
        // merge
        commit('SET_ROUTERS', resRouter)

        resolve(resRouter)
      })
    }
  }
}

export default permission
