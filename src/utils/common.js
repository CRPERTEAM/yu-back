export const isEmptyObject = (obj) => {
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}