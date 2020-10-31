import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/login'
import Axios from '@/views/test/axios'
import Banner from '@/views/systemManage/bannerManage/banner'
import News from '@/views/systemManage/newsManage/news'
import Layout from '@/views/layout/layout'

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
        }, {
            path: '/layout',
            name: 'layout',
            component: Layout,
            children: [{
                path: '/banner',
                name: 'banner',
                component: Banner,
                meta: {
                    preTitle: 'banner管理',
                    title: 'banner'
                }
            }, {
                path: '/news',
                name: 'news',
                component: News,
                meta: {
                    preTitle: '新闻管理',
                    title: 'quick news'
                }
            }]
        }
    ]
})
