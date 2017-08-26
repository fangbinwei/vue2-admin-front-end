import fetch from '../utils/fetch'

export function loginAPI (userName, password) {
  let data = {
    userName,
    password
  }
  return fetch({
    url: '/api/login',
    method: 'post',
    data
  })
}
// 可以用于后端退出
export function logoutAPI () {
  return fetch({
    url: '/logout',
    method: 'post'
  })
}
