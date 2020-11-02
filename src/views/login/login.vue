<template>
    <div class="login">
        <el-container class="loginForm">
            <el-header>{{ $manageInfo.name }}管理系统后台</el-header>
            <el-container>
                <el-aside class="aside" width="200px">
                    <img :src="img" alt="">
                </el-aside>
                <el-main v-show="show">
                    <span>登录</span>
                    <div class="inputForm">
                        <el-form label-position="right" :model="loginForm">
                            <el-form-item label="账号:" :label-width="label">
                                <el-input v-model="loginForm.account"></el-input>
                            </el-form-item>
                            <el-form-item label="密码:" :label-width="label">
                                <el-input v-model="loginForm.pwd"></el-input>
                            </el-form-item>
                            <span class="footer">
                                <el-button @click="change">注 册</el-button>
                                <el-button type="primary" @click="login">确 定</el-button>
                            </span>
                        </el-form>
                    </div>
                    <div v-show="tips">{{ message }}</div>
                </el-main>
                <el-main v-show="!show">
                    <span>注册</span>
                    <div class="inputForm">
                        <el-form label-position="left" :model="registerForm" size="mini">
                            <el-form-item label="账号:" :label-width="label">
                                <el-input v-model="registerForm.account" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名:" :label-width="label">
                                <el-input v-model="registerForm.uname" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item label="密码:" :label-width="label">
                                <el-input v-model="registerForm.pwd" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码:" :label-width="label">
                                <el-input v-model="registerForm.pwdSec" size="mini"></el-input>
                            </el-form-item>
                            <span class="footer">
                                <el-button @click="change" size="small">登 录</el-button>
                                <el-button type="primary" @click="register" size="small">确 定</el-button>
                            </span>
                        </el-form>
                    </div>
                    <div v-show="tips2">{{ message2 }}</div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        return {
            loginForm: {},
            registerForm: {},
            label: '80px',
            show: true,
            img: 'static/img/screenshots/login.jpg',
            message: '',
            message2: '',
            tips: false,
            tips2: false
        }
    },
    methods: {
        change () {
            if (this.show) {
                this.img = 'static/img/screenshots/login2.jpg'
                this.show = false
            } else {
                this.img = 'static/img/screenshots/login.jpg'
                this.show = true
            }
        },
        login () {
            let params = {
                account: this.loginForm.account,
                pwd: this.loginForm.pwd
            }
            this.$axios.get('/loginSec', {params}).then(res => {
                console.log(res)
                if (res.data === 1) {
                    this.message = '账号不存在'
                    this.tips = true
                } else {
                    if (res.data === 0) {
                        this.message = '密码错误'
                        this.tips = true
                    } else {
                        this.message = '登录中'
                        this.tips = true
                        // 路由跳转
                        setTimeout(() => {
                            this.$router.push({
                                path: '/welcome',
                                name: 'welcome'
                                // params: { admin: res.data.tmap.admin }
                            })
                        }, 1000)
                    }
                }
            }).catch(error => {
                console.error(error.message)
            })
        },
        register () {
            let params = {
                account: this.registerForm.account,
                uname: this.registerForm.uname,
                pwd: this.registerForm.pwd
            }
            this.$axios.post('/registerSec', params).then(res => {
                if (res.status === 200) {
                    this.message2 = '注册成功'
                    this.tips2 = true
                }
            }).catch(error => {
                console.error(error.message)
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import './login.less';
</style>
