export function isExistArray (array) {
  return array && array.length
}

/**
 * Parse simple path.
 */
const bailRE = /[^\w.$]/
export function parsePath (path) {
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

export function deepClone (source) {
  if (!source || typeof source !== 'object') {
    return console.error(`deepClone: ${source} is not object`)
  }
  const cloneObj = source.constructor === Array ? [] : {}

  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object') {
      cloneObj[key] = deepClone(source[key])
    } else {
      cloneObj[key] = source[key]
    }
  })

  return cloneObj
}
