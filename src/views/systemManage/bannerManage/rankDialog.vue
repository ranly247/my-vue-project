<template>
    <el-dialog
        title="排序"
        :visible.sync="addVisible"
        @close="$emit('update:show', false)"
        width="60%"
        :before-close="handleClose"
        center
    >
        <el-table
            :data="tableData"
            style="width: 100%"
            row-key="bid"
            class="sortTable"
        >
            <el-table-column type="index" label="序号" prop="index" width="100" fixed="left" align="center"/>
            <el-table-column prop="title" label="标题" width="180"/>
            <el-table-column prop="about" label="介绍"/>
            <el-table-column label="封面" width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.img" width="100%" height="100%" class="img"/>
                </template>
            </el-table-column>
        </el-table>
        <span>Tips:拖动即可排序</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Sortable from 'sortablejs'
export default {
    data () {
        return {
            addVisible: this.show,
            tableData: []
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
        queryBanner () {
            this.tableLoading = true
            this.$axios.get('/queryBanner').then(res => {
                this.tableLoading = false
                this.tableData = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        submit () {
            let bidArr = []
            for (let i = 0; i < this.tableData.length; i++) {
                bidArr[i] = this.tableData[i].bid
            }
            let params = {
                bidArr: bidArr
            }
            this.$axios.post('/src/main/sortBanner', params).then(res => {
                if (res.status === 200) {
                    this.$message.success('排序完成！')
                    this.addVisible = false
                    this.$parent.queryBanner()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 行拖拽
        rowDrop () {
            // 此时找到的元素是要拖拽元素的父容器
            const table = document.querySelectorAll('.el-table__body-wrapper tbody')[1]
            console.log(table)
            const _this = this
            Sortable.create(table, {
                //  指定父元素下可被拖拽的子元素
                draggable: '.el-table__row',
                onEnd ({ newIndex, oldIndex }) {
                    const currRow = _this.tableData.splice(oldIndex, 1)[0]
                    _this.tableData.splice(newIndex, 0, currRow)
                }
            })
        }
    },
    updated () {
        this.rowDrop()
    }
}
</script>
