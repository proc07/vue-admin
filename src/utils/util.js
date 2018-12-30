export function isExistArray (array) {
  return array && array.length
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
