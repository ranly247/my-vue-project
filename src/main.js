// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import imgApi from './utils/imgUpload.js'
import formatDate from './utils/formateDate.js'

Vue.use(ElementUi)

Vue.prototype.$axios = axios

axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

Vue.prototype.$imgApi = imgApi

Vue.prototype.$fd = formatDate

axios.defaults.withCredentials = true

Vue.prototype.$manageInfo = {
    name: 'squareEnix官网'
}
// cookie失效，路由跳转的登录页面
Vue.prototype.$login = {
    path: '/login',
    name: 'login'
}
// 跳转登录页面提示信息
Vue.prototype.$error = '登录信息失效，请重新登录'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
