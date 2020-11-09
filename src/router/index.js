import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/login'
// import Axios from '@/views/test/axios'
import Banner from '@/views/systemManage/bannerManage/banner'
import News from '@/views/systemManage/newsManage/news'
import Layout from '@/views/layout/layout'
import Sale from '@/views/systemManage/saleManage/sale'
import Estore from '@/views/systemManage/eStoreManage/estore'
import Welcome from '@/views/welcome/welcome'
import Account from '@/views/systemManage/accountManage/account'
import OfficeWebsite from '@/officeWebsite/officeWebsite'
import { Message } from 'element-ui'
import NFP from '@/views/404/404'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                console.log(from)
                if (from.name === null) {
                    next()
                    return
                }
                if (to.params.token === 1) {
                    Message.info('已返回登录界面')
                    next()
                } else if (to.params.token === 2) {
                    Message.error('登录信息已失效，请重新登录')
                    next()
                } else if (to.params.token === 3) {
                    Message.success('已退出登录')
                    next()
                } else {
                    next()
                }
            }
        }, {
            path: '*',
            name: '404',
            component: NFP
        }, {
            path: '/',
            name: 'layout',
            // component: Layout,
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
