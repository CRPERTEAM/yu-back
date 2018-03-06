import axios from 'axios'
// import qs from 'qs'
import config from '../config'
import { Message } from 'element-ui'

console.log(config)

let instance = axios.create({
  baseURL: config.baseUrl,
  timeout: config.timeout,
  headers: {
    'Content-type': 'application/json'
  }
})

instance.interceptors.request.use((conf) => {
  return conf
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
  console.log(res)
  if (res.status === 200) {
    let data = res.data
    if (data.errcode === 0) {
      Message.success(data.errmsg)
      return data
    } else {
      Message.error(data.errmsg)
      return Promise.rejct(data)
    }
  }
}, (error) => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default {
  get: async (url = '', data = {}) => {
    return instance.get(url, { params: data })
  },
  post: async (url = '', data = {}) => {
    return instance.post(url, data)
  },
  patch: async (url = '', data = {}) => {
    return instance.patch(url, data)
  },
  delete: async (url = '', data = {}) => {
    return instance.delete(url, { params: data })
  }
}
