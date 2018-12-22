import Cookie from 'js-cookie'

const KEY_TOKEN = 'admin-token'

export function getToken () {
  return Cookie.get(KEY_TOKEN)
}

export function setToken (token) {
  return Cookie.set(KEY_TOKEN, token)
}

export function removeToken () {
  return Cookie.remove(KEY_TOKEN)
}
