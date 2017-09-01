// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

import {moment, momentWithYear} from './filter/index'

import 'element-ui/lib/theme-default/index.css'
import 'normalize.css'
import '@/../static/icon/iconfont'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter('moment', moment)
Vue.filter('momentWithYear', momentWithYear)
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
export default app
