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
            <el-form-item label="标题：" :label-width="formLabelWidth" required>
                <el-input v-model="form.title"/>
            </el-form-item>
            <el-form-item label="类型：" :label-width="formLabelWidth" required>
                <el-select v-model="form.newsType" placeholder="请选择" size="mini">
                    <el-option label="游戏" :value="1"></el-option>
                    <el-option label="其他" :value="2"></el-option>
                    <el-option label="杂志" :value="3"></el-option>
                    <el-option label="唱片" :value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面：" :label-width="formLabelWidth" required>
                <input type="file" accept="image/*" @change="uploadImg()" class="imgUpload"/>
                <el-image
                    style="width: 300px; height: 170px"
                    :src="imgUrl"
                    fit="contain"
                />
            </el-form-item>
            <el-form-item label="新闻内容：" :label-width="formLabelWidth" required>
                <!-- 富文本编辑器 -->
                <rich-text-editor v-model="form.about"/>
            </el-form-item>
            <el-form-item label="发布日期：" :label-width="formLabelWidth" required>
                <div class="block">
                    <!-- <span class="demonstration">带快捷选项</span> -->
                    <el-date-picker
                    v-model="form.publishDay"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                    </el-date-picker>
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
            let params = {
                title: this.form.title,
                newsType: this.form.newsType,
                img: this.imgUrl,
                about: this.form.about,
                publishDay: this.form.publishDay
            }
            this.$axios.post('/addNews', params).then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.$message.success('添加成功！')
                    this.$parent.queryNews()
                    this.addVisible = false
                }
            }).catch(error => {
                console.error(error.message)
            })
        }
    }
}
</script>
