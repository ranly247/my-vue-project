<template>
    <el-dialog
        title="修改新闻内容"
        :visible.sync="editVisible"
        width="40%"
        :before-close="handleClose"
        center
    >
        <el-form :model="form">
            <el-form-item label="标题：" :label-width="formLabelWidth" required>
                <el-input v-model="form.title"/>
            </el-form-item>
            <el-form-item label="新闻内容：" :label-width="formLabelWidth" required>
                <!--  富文本编辑器 -->
                <rich-text-editor v-model="form.about"/>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import richTextEditor from './richTextEditor'
export default {
    components: {
        richTextEditor
    },
    data () {
        return {
            editVisible: false,
            form: {},
            formLabelWidth: '100px'
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
            // console.log(this.dialogData)
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
                about: this.form.about,
                nid: this.form.nid
            }
            this.$axios.post('/updateNewsAbout', params).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.$message.success('修改成功！')
                    this.$parent.queryNews()
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
