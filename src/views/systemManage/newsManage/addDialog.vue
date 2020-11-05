<template>
    <el-dialog
        title="新增"
        :visible.sync="addVisible"
        :show="show"
        @close="$emit('update:show', false)"
        width="40%"
        :before-close="handleClose"
        center
    >
        <el-form :model="form">
            <el-form-item label="标题：" :label-width="formLabelWidth" prop="title" :class="[errors.has('title') ? 'is-error' : '', 'is-required']">
                <el-input
                    v-model="form.title"
                    name="title"
                    data-vv-as="标题"
                    v-validate="'required'"
                />
                <div class="el-form-item__error" v-if="errors.has('title')">标题为必填项！</div>
            </el-form-item>
             <el-form-item label="类型：" :label-width="formLabelWidth" prop="type" :class="[errors.has('type') ? 'is-error' : '', 'is-required']">
                <el-select
                    v-model="form.newsType"
                    placeholder="请选择"
                    size="mini"
                    name="type"
                    data-vv-as="类型"
                    v-validate="'required'"
                >
                    <el-option label="游戏" :value="1"></el-option>
                    <el-option label="其他" :value="2"></el-option>
                    <el-option label="杂志" :value="3"></el-option>
                    <el-option label="唱片" :value="4"></el-option>
                </el-select>
                <div class="el-form-item__error" v-if="errors.has('type')">选一个咯！</div>
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
                    :src="imgUrl"
                    fit="contain"
                    placeholder="上传中..."
                />
                <div class="el-form-item__error" v-if="errors.has('img')">图片还没选呢！</div>
            </el-form-item>
            <span class="tips">&#128293;为取得最佳体验，请上传长宽比4:3的图片</span>
            <el-form-item label="新闻内容：" :label-width="formLabelWidth" prop="richText" :class="[errors.has('richText') ? 'is-error' : '', 'is-required']">
                <!-- 富文本编辑器 -->
                <rich-text-editor
                    v-model="form.about"
                    name="richText"
                    data-vv-as="新闻内容"
                    v-validate="'required|editorWords'"
                />
                <div class="el-form-item__error" v-if="errors.has('richText')">{{errors.first('richText')}}</div>
            </el-form-item>
            <el-form-item label="发布日期：" :label-width="formLabelWidth" prop="date" :class="[errors.has('date') ? 'is-error' : '', 'is-required']">
                <div class="block">
                    <!-- <span class="demonstration">带快捷选项</span> -->
                    <el-date-picker
                        v-model="form.publishDay"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        name="date"
                        data-vv-as="日期"
                        v-validate="'required'"
                    />
                    <div class="el-form-item__error" v-if="errors.has('date')">选个日期呗</div>
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
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
            addVisible: this.show,
            form: {},
            formLabelWidth: '100px',
            imgUrl: '',
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [{
                    text: '今天',
                    onClick (picker) {
                        picker.$emit('pick', new Date())
                    }
                }, {
                    text: '昨天',
                    onClick (picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        picker.$emit('pick', date)
                    }
                }]
            }
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
                        this.imgUrl = url
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
                        newsType: this.form.newsType,
                        img: this.imgUrl,
                        about: this.form.about,
                        publishDay: this.form.publishDay
                    }
                    this.$axios.post('/addNews', params).then(res => {
                        if (res.status === 200) {
                            this.$message.success('添加成功！')
                            this.$nextTick(() => {
                                this.$refs['form'].resetFields()
                                this.imgUrl = ''
                            })
                            this.$parent.queryNews()
                            this.addVisible = false
                        }
                    }).catch(error => {
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
