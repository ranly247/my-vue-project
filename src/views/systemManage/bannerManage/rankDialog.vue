<template>
    <el-dialog
        title="排序"
        :visible.sync="rankVisible"
        @close="$emit('update:showRank', false)"
        width="30%"
        :before-close="handleClose"
        center
    >
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="tableLoading"
        >
            <el-table-column type="index" label="序号" prop="index" width="100" fixed="left" align="center"/>
            <!-- <el-table-column
                prop="bid"
                label="编号"
                width="180"
                style="display:none"
            /> -->
            <el-table-column prop="title" label="标题" width="180" header-align="center"/>
            <el-table-column prop="about" label="介绍" width="600" header-align="center"/>
            <el-table-column label="封面" width="200" header-align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.img" width="100%" height="100%" class="img"/>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="rankVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            rankVisible: this.showRank,
            tableData: {},
            tableLoading: true
        }
    },
    props: {
        showRank: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        showRank () {
            this.rankVisible = this.showRank
        }
    },
    methods: {
        handleClose (done) {
            this.$confirm('确认关闭？').then(_ => {
                done()
            }).catch(_ => {})
        },
        submit () {}
    }
}
</script>
