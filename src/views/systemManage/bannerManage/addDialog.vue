<template>
    <el-dialog
        title="新增"
        :visible.sync="addVisible"
        :show="show"
        @close="$emit('update:show', false)"
        width="30%"
        :before-close="handleClose"
        center
    >
        <el-form :model="form" ref="form">
            <el-form-item label="标题：" :label-width="formLabelWidth" prop="title" :class="[errors.has('title') ? 'is-error' : '', 'is-required']">
                <el-input
                    v-model="form.title"
                    name="title"
                    data-vv-as="标题"
                    v-validate="'required'"
                />
                <div class="el-form-item__error" v-if="errors.has('title')">标题为必填项！</div>
            </el-form-item>
            <el-form-item label="介绍：" :label-width="formLabelWidth" prop="about" :class="[errors.has('about') ? 'is-error' : '', 'is-required']">
                <el-input
                    v-model="form.about"
                    type="textarea"
                    :rows="4"
                    name="about"
                    data-vv-as="介绍"
                    v-validate="'required'"
                />
                <div class="el-form-item__error" v-if="errors.has('about')">随便写点咯！</div>
            </el-form-item>
            <el-form-item label="封面：" :label-width="formLabelWidth" prop="img" :class="[errors.has('about') ? 'is-error' : '', 'is-required']">
                <input
                    type="file"
                    accept="image/*"
                    @change="uploadImg()"
                    class="imgUpload"
                    name="img"
                    data-vv-as="图片"
                    v-validate="'required'"
                />
                <el-image
                    style="width: 300px; height: 170px"
                    :src="form.imgUrl"
                    fit="contain"
                    placeholder="上传中..."
                />
                <div class="el-form-item__error" v-if="errors.has('img')">图片还没选呢！</div>
            </el-form-item>
            <span class="tips">&#128293;为取得最佳体验，请上传长宽比4:3的图片</span>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            addVisible: this.show,
            form: {},
            formLabelWidth: '80px',
            fileList: []
            // imgUrl: ''
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show () {
            this.addVisible = this.show
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
                        this.form.imgUrl = url
                    })
                }
                reader.readAsDataURL(file) // 将 Blob 或 File 对象转成base64
            }
        },
        submit () {
            this.$validator.validateAll().then((valid) => {
                if (valid) {
                    let params = {
                        title: this.form.title,
                        about: this.form.about,
                        img: this.form.imgUrl
                    }
                    this.$axios.post('/addBanner', params).then(res => {
                        if (res.data === 404) {
                            this.$message.error(this.$error)
                            this.$router.push(this.$login)
                        } else if (res.status === 200) {
                            this.$message.success('添加成功！')
                            this.$nextTick(() => {
                                this.$refs['form'].resetFields()
                                this.form.imgUrl = ''
                            })
                            this.$parent.queryBanner()
                            this.addVisible = false
                        }
                    }).catch(error => {
                        this.$message.error('添加失败...')
                        console.error(error.message)
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import '../span.less';
</style>
