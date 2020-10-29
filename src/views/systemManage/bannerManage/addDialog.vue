<template>
    <el-dialog
        title="提示"
        :visible.sync="addVisible"
        @close="$emit('update:show', false)"
        width="30%"
        :before-close="handleClose"
        center
    >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            addVisible: this.show
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
        }
    }
}
</script>
