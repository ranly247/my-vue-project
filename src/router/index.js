import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/login'
import Axios from '@/views/test/axios'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/test',
            name: 'axios',
            component: Axios
        }
    ]
})
