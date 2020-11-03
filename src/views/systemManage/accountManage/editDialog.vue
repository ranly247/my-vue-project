<template>
    <el-dialog
        title="修改用户权限"
        :visible.sync="editVisible"
        width="30%"
        :before-close="handleClose"
        center
    >
        <el-form :model="form">
            <el-form-item label="用户名：" :label-width="formLabelWidth" required>
                {{ form.uname }}
            </el-form-item>
            <el-form-item label="账号：" :label-width="formLabelWidth" required>
                {{ form.uaccount }}
            </el-form-item>
            <el-form-item label="权限：" :label-width="formLabelWidth" required>
                <el-checkbox true-label="1" v-model="form.banner" name="banner">banner管理</el-checkbox>
                <el-checkbox true-label="2" v-model="form.news" name="news">新闻管理</el-checkbox>
                <el-checkbox true-label="3" v-model="form.sale" name="sale">商品管理</el-checkbox>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            editVisible: false,
            form: {},
            formLabelWidth: '100px'
            // menu: [{
            //     id: 1,
            //     menuName: 'banner',
            //     value: '1'
            // }, {
            //     id: 2,
            //     menuName: 'news',
            //     value: '2'
            // }, {
            //     id: 3,
            //     menuName: 'sale',
            //     value: '3'
            // }]
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        dialogData: {}
    },
    watch: {
        value (val) {
            this.editVisible = val
            this.form = {...this.dialogData}
            let arr = this.dialogData.permission
            for (let key in arr) {
                // arr[key] === 'banner,' ? this.form.banner = '1' : (arr[key] === 'news,' ? this.form.news = '2' : this.form.sale = '3')
                arr[key] === 'banner,' ? this.form.banner = true : (arr[key] === 'news,' ? this.form.news = true : this.form.sale = true)
                // arr[key] === 'banner,' ? this.form.arr.push(true) : (arr[key] === 'news,' ? this.form.arr.push(true) : this.form.arr.push(true))
            }
        },
        editVisible (val) {
            this.$emit('input', val)
        }
    },
    methods: {
        handleClose (done) {
            this.$confirm('确认关闭？').then(_ => {
                done()
            }).catch(_ => {})
        },
        submit () {
            let params = {
                permission: (this.form.banner || '') + (this.form.news || '') + (this.form.sale || ''),
                usid: this.form.usid
            }
            this.$axios.post('/updateUser', params).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.$message.success('修改成功！')
                    this.$parent.queryUser()
                    this.editVisible = false
                }
            }).catch(error => {
                console.error(error.message)
            })
        }
    }
}
</script>
<style lang="less" scoped>
</style>
