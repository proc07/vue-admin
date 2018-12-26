import Cookie from 'js-cookie'

const IS_COLLAPSE = 'isCollapse'
const getCollapse = Cookie.get(IS_COLLAPSE)

const app = {
  state: {
    isCollapse: getCollapse === undefined ? false : JSON.parse(getCollapse)
  },
  mutations: {
    SET_COLLAPSE: (state, collapse) => {
      state.isCollapse = collapse
      Cookie.set(IS_COLLAPSE, collapse)
    }
  }
}

export default app
