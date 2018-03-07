export const isEmptyObject = (obj) => {
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}

export const obj2map = (obj) => {
  let map = new Map()
  for (let key in obj) {
    map.set(key, obj[key])
  }
  console.log('map: ', map)
  return map
}
