import {getToken, setToken, removeToken} from '../../utils/auth'
import {loginAPI} from '../../api/login'

const user = {
  state: {
    name: '',
    token: getToken()
  },
  getters: {
    token: state => state.token,
    name: state => state.name
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_NAME (state, name) {
      state.name = name
    }
  },
  // 登入
  actions: {
    LoginAction ({commit}, logForm) {
      return new Promise((resolve, reject) => {
        loginAPI(logForm.userName, logForm.password)
          .then(response => {
            let data = response.data
            console.log('LoginAction')
            // TODO 这部分设置的cookies 现在后端没有去验证, 后端现在只验证state中的token
            setToken(data.token)
            // 账号密码验证通过后,后端通过response把token返回,或者用cookies保存token,前端把token保存到state中
            commit('SET_TOKEN', getToken())
            resolve()
          }).catch(err => {
            reject(err)
          })
      })
    },
    // 前端 cookies过期后,清空state中的token登出
    FedLogoutAction ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
