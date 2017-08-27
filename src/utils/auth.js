import Cookies from 'js-cookie'

const tokenKey = 'User-Token'
export function getToken () {
  console.log('getToken')
  return Cookies.get(tokenKey)
}

export function setToken (token) {
  let minutes = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2)
  return Cookies.set(tokenKey, token, {expires: minutes, path: '/'})
}

export function removeToken () {
  return Cookies.remove(tokenKey, {path: '/'})
}
