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
                <!-- <el-input v-model="form.img"/> -->
                <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:8888/se/src/main/upload"
                    :show-file-list="false"
                    :on-success="successed"
                >
                    <img :src="form.img" class="avatar">
                    <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                </el-upload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="editVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            editVisible: false,
            form: {},
            formLabelWidth: '80px'
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
        successed (e) {
            // let file = e.target.files[0]
            // if (file) {
            //     let name = e.target.files[0].name
            //     let reader = new FileReader()
            //     reader.onload = function (event) {
            //         let base64 = event.target.result
            //         let base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
            //         console.log('base64Data', base64Data)
            //         this.$axios.post('/src/main/upload', {
            //             name,
            //             file: base64Data
            //         }).then(res => {
            //             console.log('url', res.data.result.url)
            //             let url = res.data.result.url
            //             this.form.img = url
            //             // console.log(urlInput.value);
            //         })
            //     }
            //     reader.readAsDataURL(file) // 将 Blob 或 File 对象转成base64
            // }
        }
    }
}
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 360px;
    height: 200px;
    line-height: 200px;
    text-align: center;
}
.avatar {
    width: 300px;
    height: 170px;
    display: block;
    border-radius: 5px;
    border: 1px dashed #8c939d;
}
</style>
