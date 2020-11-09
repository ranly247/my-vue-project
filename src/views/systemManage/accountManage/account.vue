<template>
    <div>
        <el-row>
            <!-- <el-button type="primary" icon="el-icon-top" @click="rank">排序</el-button> -->
            <el-input v-model="input" placeholder="请输入账号" clearable/>
            <el-button type="success" icon="el-icon-search" @click="queryUser">搜索</el-button>
        </el-row>
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="tableLoading"
        >
            <el-table-column type="index" label="序号" prop="index" width="50" fixed="left" align="center"/>
            <el-table-column prop="uname" label="用户名" width="150" align="center"/>
            <el-table-column label="账号" width="150" align="center" prop="uaccount"/>
            <el-table-column prop="permission" label="权限" width="200" align="center" class="longText">
                <!-- <template slot-scope="scope"> -->
                    <!-- <el-tag
                        effect="dark"
                        disable-transitionsr
                        :type="scope.row.shoppingType === 1 ? 'danger' :(scope.row.shoppingType === 2 ? 'info' : 'success')"
                    >
                        {{scope.row.shoppingType === 1 ? '游戏' :(scope.row.shoppingType === 2 ? '其他' : '杂志')}}
                    </el-tag> -->
                <!-- </template> -->
            </el-table-column>
            <el-table-column label="密码" width="150" align="center" prop="pwd"/>
            <el-table-column label="操作" max-width=150 align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">修改</el-button>
                    <el-button type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <rank-dialog :show.sync="showRank" ref="header"/> -->
        <edit-dialog v-model="editDialog" :dialogData="rowData"/>
        <!-- <more-dialog v-model="moreDialog" :dialogData="rowData"/> -->
    </div>
</template>

<script>
import editDialog from './editDialog'
// import moreDialog from './moreDialog'
export default {
    name: 'account',
    components: {
        editDialog
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
        queryUser () {
            this.tableLoading = true
            let params = {
                account: this.input || ''
            }
            this.$axios.get(this.$api.account.queryUser, {params}).then(res => {
                if (res.data === 404) {
                    // this.$message.error(this.$error)
                    this.$router.push(this.$store.state.login)
                } else {
                    this.tableLoading = false
                    this.tableData = res.data
                    this.tableData.forEach((e, index) => {
                        let arr2 = []
                        let arr = this.tableData[index].permission.split('')
                        for (let key in arr) {
                            arr[key] === '1' ? arr2.push('banner,') : (arr[key] === '2' ? arr2.push('news,') : arr2.push('sale,'))
                        }
                        this.tableData[index].permission = arr2
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        edit (val) {
            this.rowData = val
            this.editDialog = true
        },
        del (row) {
            this.$confirm(`${row.uaccount}`, '确认删除?', {center: true}).then(_ => {
                let params = {
                    usid: row.usid
                }
                // this.$axios.post('/delUser', params).then(res => {
                this.$axios.post(this.$api.account.delUser, params).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.$message.success('已删除')
                        this.queryUser()
                    }
                }).catch(error => {
                    console.error(error.message)
                })
            }).catch(_ => {})
        }
    },
    created () {
        this.queryUser()
    }
}
</script>

<style lang="less" scoped>
</style>
