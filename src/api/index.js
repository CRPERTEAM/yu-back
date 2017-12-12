import axios from './axios'

export const adminLogin = (params) => axios.post('/admin/login', params)
export const adminLogout = (params) => axios.post('/admin/logout', params)
export const adminRegister = (params) => axios.post('/admin/register', params)

export const getGoodsList = (params) => axios.get('/goods', params)
export const getGoods = (params) => axios.get(`/goods/${params._id}`)
export const addGoods = (params) => axios.post('/goods', params)
export const updateGoods = (params) => axios.patch('/goods', params)
export const deleteGoods = (params) => axios.delete(`/goods/${params._id}`)

export const getGoodsTypeList = (params) => axios.get('/goods-type', params)
export const getGoodsType = (params) => axios.get(`/goods-type/${params._id}`)
export const addGoodsType = (params) => axios.post('/goods-type', params)
export const updateGoodsType = (params) => axios.patch('goods-type', params)
export const deleteGoodsType = (params) => axios.delete(`/goods-type/${params._id}`)
