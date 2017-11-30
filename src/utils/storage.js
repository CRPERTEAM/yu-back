export const USER_TOKEN = 'YUCMSUserToken'

const setStorage = (key, value) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, value)
  }
}

const getStorage = (key) => {
  if (window.localStorage) {
    let value = window.localStorage.getItem(key)
    console.log('value', value)
    return value
  }
}

const removeStorage = (key) => {
  if (window.localStorage) {
    window.localStorage.removeItem(key)
  }
}

export const storage = {
  set: setStorage,
  get: getStorage,
  remove: removeStorage
}

export const getToken = () => {
  this.getStorage(USER_TOKEN)
}

export const setToken = (value) => {
  this.setStorage(USER_TOKEN, value)
}

export const removeToken = (value) => {
  this.removeToken(USER_TOKEN, value)
}
