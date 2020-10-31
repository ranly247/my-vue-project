<template>
    <el-container class="layoutPage">
        <el-header class="layoutHeader" height="48px">
            <label class="titleName">squareEnix</label>
            <label class="name">ranly</label>
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
                        <i class="el-icon-d-arrow-left"> 隐藏菜单</i>
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
                {
                    children: [
                        {
                            disabled: false,
                            menuIcon: '',
                            menuId: 11,
                            menuName: 'banner',
                            menuPath: 'banner',
                            menuRemark: '“我是备注”',
                            parentMenuId: 1
                        }
                    ],
                    disabled: false,
                    menuIcon: 'el-icon-location-information',
                    menuId: 1,
                    menuName: 'banner管理',
                    menuPath: 'a',
                    menuRemark: '',
                    parentMenuId: 0
                },
                {
                    children: [
                        {
                            disabled: false,
                            menuIcon: '',
                            menuId: 222,
                            menuName: 'quick news',
                            menuPath: 'news',
                            menuRemark: '“我是备注”',
                            parentMenuId: 22
                        }
                    ],
                    disabled: false,
                    menuIcon: 'el-icon-news',
                    menuId: 22,
                    menuName: '新闻管理',
                    menuPath: 'b',
                    menuRemark: '',
                    parentMenuId: 0
                },
                {
                    children: [
                        {
                            disabled: false,
                            menuIcon: '',
                            menuId: 3333,
                            menuName: 'sale',
                            menuPath: 'sale',
                            menuRemark: '“我是备注”',
                            parentMenuId: 333
                        }
                    ],
                    disabled: false,
                    menuIcon: 'el-icon-shopping-bag-1',
                    menuId: 333,
                    menuName: '商品管理',
                    menuPath: 'c',
                    menuRemark: '',
                    parentMenuId: 0
                }
            ],
            userInfo: {
                name: ''
            },
            routerViewHeight: 300
        }
    },
    created () {
        // this.initMenu()
        // this.returnValue()
        this.routerViewHeight = (document.body.clientHeight - 220) > 300 ? (document.body.clientHeight - 220) : 300
    },
    methods: {
        handleSignOut () {
        //     this.$msgbox({
        //         title: '确认框',
        //         message: '确定要退出登录吗？',
        //         showCancelButton: true,
        //         beforeClose: (action, instance, done) => {
        //             if (action === 'confirm') {
        //                 instance.confirmButtonLoading = true
        //                 instance.confirmButtonText = 'loading...'
        //                 setTimeout(() => {
        //                     this.signOut()
        //                         .then(() => {
        //                             instance.confirmButtonLoading = false
        //                             done()
        //                         })
        //                         .catch(error => {
        //                             console.log(error, 11)
        //                         })
        //                 }, 300)
        //             } else {
        //                 done()
        //             }
        //         }
        //     }).then(action => {
        //         this.$message({
        //             type: 'success',
        //             message: '退出登录成功'
        //         })
        //     }).catch(cancle => {
        //         // 点取消按钮
        //     })
        // },
        // signOut () {
        //     return new Promise((resolve, reject) => {
            this.$apis.logout().then(res => {
                if (res.code === '2000') {
                    localStorage.clear()
                    this.$router.push('/login')
                    this.$message.success('退出成功！')
                }
            })
        },
        initMenu () {
            let userId = this.$route.params.userId
            this.$apis.initMenu({
                userId,
                sid: 1
            }).then(res => {
                if (res.code === '2000') {
                    this.menus = res.data.menus
                    this.userInfo = res.data.userInfo
                }
            }).catch(error => {
                console.error(error.message)
            })
        }
        // returnValue () {
        //     // let a = this.$route.params.name
        //     // this.userInfo.name = a
        //     let b = '2'
        //     b = this.$route.params.admin
        //     if (b === undefined) {
        //         b = '2'
        //     }
        //     if (b === '2') {
        //         this.$router.push('/login')
        //         this.$message.error('请先登录！')
        //     }
        // }
    }
}
</script>

<style lang="less" scoped>
@import './layout.less';
</style>
