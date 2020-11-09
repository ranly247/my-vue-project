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
import Menu from './utils/intMenu.js'
import veeValidate from './utils/veeValidate'
import store from '@/store/index'
import apis from '@/apis/index'

Vue.prototype.$api = apis

// 全局使用 element-ui
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
Vue.prototype.$uname = '未登录'
// cookie失效，路由跳转的登录页面
// Vue.prototype.$login = {
//     path: '/login',
//     name: 'login'
// }
// 跳转登录页面提示信息
// Vue.prototype.$error = '登录信息已失效，请重新登录'

// 配置菜单
Vue.prototype.$banner = Menu.menu.banner
Vue.prototype.$news = Menu.menu.news
Vue.prototype.$sale = Menu.menu.sale
Vue.prototype.$ranly = Menu.menu.ranly

// 配置表单验证
// 全局使用 vee-validate
Vue.use(veeValidate, {
    locale: 'zh_CN',
    fieldsBagName: 'errorBag',
    events: 'blur|input'
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
