<template>
    <div>
        <el-row>
            <el-button type="primary" icon="el-icon-plus" @click="add">增加</el-button>
            <!-- <el-button type="primary" icon="el-icon-top" @click="rank">排序</el-button> -->
            <el-input v-model="input" placeholder="请输入标题" clearable/>
            <el-button type="success" icon="el-icon-search" @click="queryEstore">搜索</el-button>
        </el-row>
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="tableLoading"
        >
            <el-table-column type="index" label="序号" prop="index" width="50" fixed="left" align="center"/>
            <!-- <el-table-column
                prop="bid"
                label="编号"
                width="180"
                style="display:none"
            /> -->
            <el-table-column prop="title" label="标题" width="180" align="center"/>
            <el-table-column prop="shoppingType" label="类型" width="100" align="center" class="longText">
                <template slot-scope="scope">
                    <el-tag
                        effect="dark"
                        disable-transitionsr
                        :type="scope.row.shoppingType === 1 ? 'danger' :(scope.row.shoppingType === 2 ? 'info' : (scope.row.shoppingType === 3 ? 'success' : ''))"
                    >
                        {{scope.row.shoppingType === 1 ? '游戏' :(scope.row.shoppingType === 2 ? '其他' : (scope.row.shoppingType === 3 ? '杂志' : '唱片'))}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="封面" width="200" header-align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.img" width="100%" height="100%" class="img"/>
                </template>
            </el-table-column>
            <el-table-column label="价格/日元" width="150" align="center" prop="price"/>
            <el-table-column label="上架时间" width="150" align="center" prop="publishDay"/>
            <el-table-column label="操作" max-width=150 align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">修改</el-button>
                    <el-button type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-dialog :show.sync="show"/>
        <!-- <rank-dialog :show.sync="showRank" ref="header"/> -->
        <edit-dialog v-model="editDialog" :dialogData="rowData"/>
        <!-- <more-dialog v-model="moreDialog" :dialogData="rowData"/> -->
    </div>
</template>

<script>
import addDialog from './addDialog'
import editDialog from './editDialog'
// import moreDialog from './moreDialog'
export default {
    name: 'estore',
    components: {
        addDialog,
        editDialog
        // moreDialog
    },
    data () {
        return {
            input: '',
            tableData: [],
            // date: '',
            tableLoading: true,
            show: false,
            // showRank: false,
            editDialog: false,
            // moreDialog: false,
            rowData: []
        }
    },
    methods: {
        queryEstore () {
            this.tableLoading = true
            let params = {
                title: this.input || ''
            }
            this.$axios.get('/src/main/queryEstore', {params}).then(res => {
                this.tableLoading = false
                this.tableData = res.data
                this.tableData.forEach((e, index) => {
                    this.tableData[index].publishDay = this.$fd.formateDate(this.tableData[index].publishDay)
                })
            }).catch(err => {
                console.log(err)
            })
        },
        add () {
            this.show = true
        },
        more (val) {
            // this.rowData = val
            // this.moreDialog = true
        },
        edit (val) {
            this.rowData = val
            this.editDialog = true
        },
        del (row) {
            this.$confirm(`${row.title}`, '确认删除?', {center: true}).then(_ => {
                let params = {
                    ssid: row.ssid
                }
                this.$axios.post('/delEstore', params).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.$message.success('已删除')
                        this.queryEstore()
                    }
                }).catch(error => {
                    console.error(error.message)
                })
            }).catch(_ => {})
        }
    },
    created () {
        this.queryEstore()
    }
}
</script>

<style lang="less" scoped>
</style>
