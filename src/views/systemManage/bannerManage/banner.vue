<template>
    <div>
        <el-row>
            <el-button type="primary" icon="el-icon-plus" @click="add">增加</el-button>
            <el-input v-model="input" placeholder="请输入内容"/>
            <el-button type="success" icon="el-icon-search" @click="queryBanner">搜索</el-button>
        </el-row>
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column type="index" label="序号" prop="index" width="100" fixed="left"/>
            <!-- <el-table-column
                prop="bid"
                label="编号"
                width="180"
                style="display:none"
            /> -->
            <el-table-column prop="title" label="标题" width="180"/>
            <el-table-column prop="about" label="介绍" width="600"/>
            <el-table-column label="封面" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" width="100%" height="100%" class="img"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" max-width=150>
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">修改</el-button>
                    <el-button type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-dialog :show.sync="show"/>
        <edit-dialog v-model="editDialog" :dialogData="rowData"/>
        <!-- <add-dialog :visible.sync="visible"/> -->
    </div>
</template>

<script>
import addDialog from './addDialog'
import editDialog from './editDialog'
export default {
    name: 'banner',
    components: {
        addDialog,
        editDialog
    },
    data () {
        return {
            input: '',
            tableData: [],
            show: false,
            editDialog: false,
            rowData: []
            // visible: false
        }
    },
    methods: {
        queryBanner () {
            this.$axios.get('/index/queryBanner').then(res => {
                this.tableData = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        add () {
            this.show = true
        },
        edit (val) {
            this.rowData = val
            this.editDialog = true
        },
        del (row) {
            this.$confirm(`${row.title}`, '确认删除?', {center: true}).then(_ => {
                let params = {
                    bid: row.bid
                }
                this.$axios.post('/delBanner', params).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.$message.success('已删除')
                        this.queryBanner()
                    }
                }).catch(error => {
                    console.error(error.message)
                })
            }).catch(_ => {})
        }
    },
    created () {
        this.queryBanner()
    }
}
</script>

<style lang="less" scoped>
</style>
