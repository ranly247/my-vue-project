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
                            <el-form-item label="账号:"
                                :label-width="label"
                                prop="account"
                                :class="[errors.has('account') ? 'is-error' : '', 'is-required']"
                            >
                                <el-input
                                    v-model="loginForm.account"
                                    name="account"
                                    data-vv-as="账号"
                                    v-validate="'required|numeric'"
                                />
                                <div class="el-form-item__error" v-if="errors.has('account')">{{errors.first('account')}}</div>
                            </el-form-item>
                            <el-form-item label="密码:"
                                :label-width="label"
                                prop="pwd"
                                :class="[errors.has('pwd') ? 'is-error' : '', 'is-required']"
                            >
                                <el-input
                                    v-model="loginForm.pwd"
                                    show-password
                                    name="pwd"
                                    data-vv-as="密码"
                                    v-validate="'required|minMax:6,18|noCN'"
                                />
                                <div class="el-form-item__error" v-if="errors.has('pwd')">{{errors.first('pwd')}}</div>
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
                        <el-form label-position="left" :model="form" size="mini" ref="form">
                            <el-form-item
                                label="账号:"
                                :label-width="label"
                                prop="account2"
                                :class="[errors.has('account2') ? 'is-error' : '', 'is-required']"
                            >
                                <el-input
                                    v-model="form.account"
                                    size="mini"
                                    name="account2"
                                    data-vv-as="账号"
                                    v-validate="'required|numeric'"
                                />
                                <div class="el-form-item__error" v-if="errors.has('account2')">{{errors.first('account2')}}</div>
                            </el-form-item>
                            <el-form-item label="用户名:"
                                :label-width="label"
                                prop="uname"
                                :class="[errors.has('uname') ? 'is-error' : '', 'is-required']"
                            >
                                <el-input
                                    v-model="form.uname"
                                    size="mini"
                                    name="uname"
                                    data-vv-as="用户名"
                                    v-validate="'required|minMax:2,12'"
                                />
                                <div class="el-form-item__error" v-if="errors.has('uname')">{{errors.first('uname')}}</div>
                            </el-form-item>
                            <el-form-item label="密码:"
                                :label-width="label"
                                prop="pwd2"
                                :class="[errors.has('pwd2') ? 'is-error' : '', 'is-required']"
                            >
                                <el-input
                                    v-model="form.pwd"
                                    show-password
                                    name="pwd2"
                                    data-vv-as="密码"
                                    v-validate="'required|minMax:6,18|noCN'"
                                />
                                <div class="el-form-item__error" v-if="errors.has('pwd2')">{{errors.first('pwd2')}}</div>
                            </el-form-item>
                            <el-form-item label="确认密码:" :label-width="label">
                                <el-input v-model="form.pwdSec" size="mini" show-password/>
                                <div class="el-form-item__error" v-show="this.form.pwdSec !== this.form.pwd">两次密码输入不一致</div>
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
            form: {},
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
            this.$validator.validateAll().then((a) => {
                // if (a) {
                let params = {
                    account: this.loginForm.account,
                    pwd: this.loginForm.pwd
                }
                this.$axios.get('/loginSec', {params}).then(res => {
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
                // }
            })
        },
        register () {
            this.$validator.validateAll().then((valid) => {
                // if (valid) {
                let params = {
                    account: this.form.account,
                    uname: this.form.uname,
                    pwd: this.form.pwd
                }
                this.$axios.post('/registerSec', params).then(res => {
                    if (res.status === 200) {
                        this.message2 = '注册成功'
                        this.$nextTick(() => {
                            this.$refs['form'].resetFields()
                        })
                        this.tips2 = true
                    }
                }).catch(error => {
                    console.error(error.message)
                })
                // }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import './login.less';
</style>
