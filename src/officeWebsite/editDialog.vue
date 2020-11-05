<template>
    <el-dialog
        :title="title"
        :visible.sync="editVisible"
        width="30%"
        :before-close="handleClose"
        center
    >
        <div class="publishDay">
            <img v-show="newsType === 1" src="@/assets/lbl_game.png" alt="">
            <img v-show="newsType === 2" src="@/assets/lbl_other.png" alt="">
            <img v-show="newsType === 3" src="@/assets/lbl_magazine.png" alt="">
            <img v-show="newsType === 4" src="@/assets/lbl_music.png" alt="">
            <span>{{ publishDay }}</span>
        </div>
        <div v-html="content"></div>
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
            title: '',
            content: '',
            publishDay: '',
            newsType: ''
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
            this.title = this.dialogData.title
            this.content = this.dialogData.about
            this.publishDay = this.dialogData.publishDay
            this.newsType = this.dialogData.newsType
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
        }
    }
}
</script>
<style lang="less" scoped>
.publishDay{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        flex: 0 0 15%;
        width: 20%;
        height: auto;
        // background-color: violet;
    }
    span{
        display: block;
        height: 100%;
        flex: 0 0 40%;
        line-height: 30px;
        // background-color: aqua;
    }
}
</style>
