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
            <el-form-item label="类型：" :label-width="formLabelWidth" prop="type" :class="[errors.has('type') ? 'is-error' : '', 'is-required']">
                <el-select
                    v-model="form.shoppingType"
                    placeholder="请选择"
                    size="mini"
                    name="type"
                    data-vv-as="类型"
                    v-validate="'required'"
                >
                    <el-option label="游戏" :value="1"></el-option>
                    <el-option label="其他" :value="2"></el-option>
                    <el-option label="杂志" :value="3"></el-option>
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
                    :src="form.imgUrl"
                    fit="contain"
                    placeholder="上传中..."
                />
                <div class="el-form-item__error" v-if="errors.has('img')">图片还没选呢！</div>
            </el-form-item>
            <span class="tips">&#128293;为取得最佳体验，请上传长宽比1:1的图片</span>
            <el-form-item label="价格：" :label-width="formLabelWidth" prop="price" :class="[errors.has('price') ? 'is-error' : '', 'is-required']">
                <el-input
                    v-model="form.price"
                    placeholder="请输入4-6位数的价格，单位为日元"
                    name="price"
                    data-vv-as="价格"
                    v-validate="'required|numeric|min_value:1000|max_value:1000000'"
                />
                <div class="el-form-item__error" v-if="errors.has('price')">{{errors.first('price')}}</div>
            </el-form-item>
            <el-form-item label="上架日期：" :label-width="formLabelWidth" prop="date" :class="[errors.has('date') ? 'is-error' : '', 'is-required']">
                <div class="block">
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
export default {
    data () {
        return {
            addVisible: this.show,
            form: {},
            formLabelWidth: '100px',
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
                        shoppingType: this.form.shoppingType,
                        img: this.form.imgUrl,
                        price: this.form.price,
                        publishDay: this.form.publishDay
                    }
                    this.$axios.post(this.$api.sale.addSale, params).then(res => {
                        if (res.status === 200) {
                            this.$message.success('添加成功！')
                            this.$nextTick(() => {
                                this.$refs['form'].resetFields()
                                this.form.imgUrl = ''
                            })
                            this.$parent.querySale()
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
