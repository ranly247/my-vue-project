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
import tFn from './views/test/test.js'

Vue.use(ElementUi)

Vue.prototype.$axios = axios

axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

Vue.prototype.$imgApi = imgApi

Vue.prototype.$fd = formatDate

Vue.prototype.$tFn = tFn

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
