<template>
    <el-container class="layoutPage">
        <el-header class="layoutHeader" height="48px">
            <label class="titleName">{{ $manageInfo.name }}</label>
            <label class="name">{{ $uname }}</label>
            <img @click="signOut" class="signoutImg" src="@/assets/icon_signout.png" alt="退出">
            <!-- <img @click="handleSignOut" class="signoutImg" src="@/assets/images/icon_signout.png" alt="退出"> -->
        </el-header>
        <el-container>
            <div class="layoutAside">
                <template v-if="isCollapse">
                    <el-tooltip class="item" effect="dark" placement="left" content="展开菜单">
                        <div class="hideMenuDiv" @click="isCollapse = !isCollapse">
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template v-else>
                    <div class="hideMenuDiv" @click="isCollapse = !isCollapse">
                        <i class="el-icon-d-arrow-left">隐藏菜单</i>
                    </div>
                </template>
                <el-menu
                    :unique-opened="false"
                    :router="true"
                    :collapse="isCollapse"
                    class="elMenu"
                    text-color="#fff"
                    background-color="#37363b"
                    active-text-color="#ff9234"
                    :default-active="$route.name">
                    <el-menu-item index="welcome">
                        <i class="el-icon-location-outline"></i>
                        <span slot="title">首页在这呢！</span>
                    </el-menu-item>
                    <template v-for="item in menus">
                        <!--左侧导航条-->
                        <el-submenu v-if="item.children.length > 0" :key="item.menuId" :index="item.menuPath" unique-opened="true">
                            <template slot="title">
                                <i :class="item.menuIcon"/>
                                <span slot="title">{{item.menuName}}</span>
                            </template>
                            <el-menu-item v-for="childItem in item.children" :key="childItem.menuId" :index="childItem.menuPath">
                                {{childItem.menuName}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :key="item.menuId" :index="item.menuPath">
                            <i :class="item.menuIcon"/>
                            <span slot="title">{{item.menuName}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </div>
            <el-main class="layoutMain">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="layoutBreadcrumb">
                    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="$route.meta && $route.meta.prePreTitle">{{ $route.meta.prePreTitle }}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="$route.meta && $route.meta.preTitle">{{ $route.meta.preTitle }}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="$route.meta && $route.meta.title">{{ $route.meta.title }}</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view :style="'height:' + routerViewHeight + 'px'"/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
            isCollapse: false,
            menus: [
                // this.$banner,
                // this.$news,
                // this.$sale,
                // this.$ranly
            ],
            // uname: '未登录',
            routerViewHeight: 300
        }
    },
    created () {
        this.initMenu()
        this.routerViewHeight = (document.body.clientHeight - 220) > 300 ? (document.body.clientHeight - 220) : 300
    },
    methods: {
        initMenu () {
            // this.$axios.get('/queryMenu').then(res => {
            this.$axios.get(this.$api.layout.queryMenu).then(res => {
            // this.$axios.get('/queryMenu').then(res => {
                if (res.data === 404) {
                    // this.$router.push(this.$login)
                    // this.$message.info('您当前未登录')
                } else {
                    // console.log(res)
                    this.$uname = res.data[0].uname
                    let arr = (res.data[0].permission || '').split('')
                    for (let key in arr) {
                        arr[key] === '1' ? this.menus.push(this.$banner) : (arr[key] === '2' ? this.menus.push(this.$news) : this.menus.push(this.$sale))
                    }
                    if (res.data[0].usid === 24) {
                        this.menus.push(this.$ranly)
                    }
                }
            })
        },
        signOut () {
            // this.$axios.get('/logout').then(res => {
            this.$axios.get(this.$api.layout.logout).then(res => {
                if (res.data === 404) {
                    this.$router.push({
                        path: '/login',
                        name: 'login',
                        params: {
                            token: 1
                        }
                    })
                } else {
                    this.$router.push({
                        path: '/login',
                        name: 'login',
                        params: {
                            token: 3
                        }
                    })
                    // this.$message.success('已退出登录！')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import './layout.less';
</style>
