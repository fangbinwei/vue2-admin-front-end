import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
// import app from '../main'
// import {getToken} from './auth'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5000,
  data: {}
  // withCredentials: true, // 让cookies可以跨域传送?
})

// Add a request interceptor
service.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 如果state的里面有token,说明已经登入,这样可以让后端检查token,后端还检测cookie的保存时间是已过
  if (store.getters.token) {
    config.headers['access-token'] = store.getters.token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
service.interceptors.response.use(function (response) {
  // Do something with response data
  let data = response.data
  // status '01' cookies过期 status '02' token过期
  if (data.status === '02') {
    Message({
      type: 'error',
      message: '您没有权限,请登入',
      duration: 1000
    })
    store.dispatch('FedLogoutAction')
      .then(() => {
        // app.$router.replace({name: 'login'})
      })
    return Promise.reject(data.msg)
  }
  // 如果  status不是 '1', 则reject
  if (data.status !== '1') {
    Message({
      type: 'error',
      message: data.msg
    })
    return Promise.reject()
  } else {
    return response
  }
  // response error 统一处理
}, function (error) {
  // Do something with response error
  Message({
    type: 'error',
    message: '服务器出错: ' + error.message
  })
  return Promise.reject()
})
export default service
