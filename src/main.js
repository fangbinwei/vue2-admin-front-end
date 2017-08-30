// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

import moment from 'moment'
import 'element-ui/lib/theme-default/index.css'
import 'normalize.css'
import '@/../static/icon/iconfont'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'MM-DD HH:mm:ss'
  return moment(value).format(formatString)
})
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
export default app
