<template>
    <el-dialog
        title="修改"
        :visible.sync="editVisible"
        width="30%"
        :before-close="handleClose"
        center
    >
        <el-form :model="form">
            <el-form-item label="标题：" :label-width="formLabelWidth" required>
                <el-input v-model="form.title"/>
            </el-form-item>
            <el-form-item label="介绍：" :label-width="formLabelWidth" required>
                <el-input v-model="form.about"  type="textarea" :rows="4"/>
            </el-form-item>
            <el-form-item label="封面：" :label-width="formLabelWidth" required>
                <input type="file" accept="image/*" @change="uploadImg()" class="imgUpload"/>
                <el-image
                    style="width: 300px; height: 170px"
                    :src="form.img"
                    fit="contain"
                />
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
            formLabelWidth: '80px',
            imgUrl: ''
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
        uploadImg () {
            let img = document.querySelector('.imgUpload')
            // console.log(img)
            // console.log(img.files)
            // console.log(this.fileList)
            // let file = event.target.files[0]
            let file = img.files[0]
            // let file = this.fileList[0]
            // console.log(file)
            if (file) {
                // let name = event.target.files[0].name
                let name = file.name
                let reader = new FileReader()
                reader.onload = (event) => {
                    let base64 = event.target.result
                    let base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
                    // console.log('base64Data', base64Data)
                    this.$axios.post('/src/main/upload', {
                        name,
                        file: base64Data
                    }).then(res => {
                        // console.log('url', res.data.result.url)
                        let url = res.data.result.url
                        this.form.img = url
                    })
                }
                reader.readAsDataURL(file) // 将 Blob 或 File 对象转成base64
            }
        },
        submit () {
            let params = {
                title: this.form.title,
                about: this.form.about,
                img: this.form.img,
                bid: this.form.bid
            }
            // this.$axios.post('/updateBanner', params).then(res => {
            this.$axios.post(this.$api.banner.updateBanner, params).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.$message.success('修改成功！')
                    this.$parent.queryBanner()
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
