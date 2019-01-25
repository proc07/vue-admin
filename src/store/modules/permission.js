import router, { constantRouter, asyncRouter } from '@/router'
import { isExistArray } from '@/utils/util'

const routerOptions = router.options
const CONSTANT_MODE = 'constant'
const ASYNC_MODE = 'async'
const MAP_PATH = routerOptions.mapRequestKey.path || ''
const MAP_ICON = routerOptions.mapRequestKey.icon || ''
const MAP_TITLE = routerOptions.mapRequestKey.title || ''
const MAP_CHILDREN = routerOptions.mapRequestKey.children || ''

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
    let mergeRouter = mergeRoutes(reqRoute, asyncRouter)

    if (!mergeRouter) {
      mergeRouter = createRouter(reqRoute)
    }
    resRouter.push(mergeRouter)
  }
  return resRouter
}

function createRouter (router) {
  const resRouter = {
    path: router[MAP_PATH],
    meta: {
      title: router[MAP_TITLE],
      icon: router[MAP_ICON],
      // roles: [store.getters.userInfo._roleId]
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

function mergeRoutes (reqRouter, asyncRouter) {
  let assignRouter = {}

  for (let asRouter of asyncRouter) {
    // config extract key
    if (asRouter.path === reqRouter[MAP_PATH]) {
      asRouter.meta.icon = reqRouter[MAP_ICON]
      asRouter.meta.title = reqRouter[MAP_TITLE]
      // asRouter.meta.roles.push(store.getters.userInfo._roleId)

      assignRouter = Object.assign({}, asRouter, { children: [] })

      if (reqRouter[MAP_CHILDREN] && reqRouter[MAP_CHILDREN].length) {
        reqRouter[MAP_CHILDREN].forEach(child => {
          const resRouter = mergeRoutes(child, asRouter.children)
          if (resRouter) {
            assignRouter.children.push(resRouter)
          } else {
            assignRouter.children.push(createRouter(child))
          }
        })
      }

      return assignRouter
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

        if (routerOptions.routerMode === ASYNC_MODE) {
          // normal router.meta
          normalAsyncRouterMeta(asyncRouter)
          // merge request or async router
          const filterRouter = generateRoutes(routerOrRole, asyncRouter)
          resRouter = resRouter.concat(constantRouter, filterRouter)
        } else if (routerOptions.routerMode === CONSTANT_MODE) {
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
