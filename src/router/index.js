import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/login'
import Axios from '@/views/test/axios'
import Banner from '@/views/systemManage/bannerManage/banner'
import News from '@/views/systemManage/newsManage/news'
import Layout from '@/views/layout/layout'
import Sale from '@/views/systemManage/saleManage/sale'
import Estore from '@/views/systemManage/eStoreManage/estore'
import Welcome from '@/views/welcome/welcome'
import Account from '@/views/systemManage/accountManage/account'
import OfficeWebsite from '@/officeWebsite/officeWebsite'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/test',
            name: 'axios',
            component: Axios
        }, {
            path: '/',
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
            }, {
                path: '/sale',
                name: 'sale',
                component: Sale,
                meta: {
                    preTitle: '商品管理',
                    title: 'sale'
                }
            }, {
                path: '/estore',
                name: 'estore',
                component: Estore,
                meta: {
                    preTitle: '商品管理',
                    title: 'estore'
                }
            }, {
                path: '/welcome',
                name: 'welcome',
                component: Welcome
            }, {
                path: '/account',
                name: 'account',
                component: Account
            }]
        }, {
            path: '/web',
            name: 'officeWebsite',
            component: OfficeWebsite
        }
    ]
})
