<template>
    <div>
        <el-row>
            <el-button type="primary" icon="el-icon-plus" @click="add">增加</el-button>
            <el-button type="primary" icon="el-icon-top" @click="rank">排序</el-button>
            <el-input v-model.trim="input" placeholder="请输入标题" clearable/>
            <el-button type="success" icon="el-icon-search" @click="queryBanner">搜索</el-button>
        </el-row>
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
            <el-table-column prop="title" label="标题" width="180" align="center"/>
            <el-table-column prop="about" label="介绍" width="450" header-align="center" class="longText"/>
            <el-table-column label="封面" width="200" header-align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.img" width="100%" height="100%" class="img"/>
                </template>
            </el-table-column>
            <el-table-column label="是否在首页展示" width="150" align="center">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.isshow"
                        :active-value=1
                        :inactive-value=0
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否"
                        @change="changeShow(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" max-width=150 align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">修改</el-button>
                    <el-button type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-dialog :show.sync="show"/>
        <rank-dialog :show.sync="showRank" ref="header"/>
        <edit-dialog v-model="editDialog" :dialogData="rowData"/>
        <!-- <add-dialog :visible.sync="visible"/> -->
    </div>
</template>

<script>
import addDialog from './addDialog'
import editDialog from './editDialog'
import rankDialog from './rankDialog'
export default {
    name: 'banner',
    components: {
        addDialog,
        editDialog,
        rankDialog
    },
    data () {
        return {
            input: '',
            tableData: [],
            tableLoading: true,
            show: false,
            showRank: false,
            editDialog: false,
            rowData: []
            // visible: false
        }
    },
    methods: {
        queryBanner () {
            this.tableLoading = true
            let params = {
                title: this.input || ''
            }
            // this.$axios.get('/queryBanner', {params}).then(res => {
            this.$axios.get(this.$api.banner.queryBanner, {params}).then(res => {
                if (res.data === 404) {
                    // this.$message.error(this.$error)
                    this.$router.push(this.$store.state.login)
                } else {
                    this.tableLoading = false
                    this.tableData = res.data
                }
            }).catch(err => {
                console.log(err)
            })
        },
        add () {
            this.show = true
        },
        rank () {
            this.showRank = true
            this.$refs.header.queryBanner()
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
                // this.$axios.post('/delBanner', params).then(res => {
                this.$axios.post(this.$api.banner.delBanner, params).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.$message.success('已删除')
                        this.queryBanner()
                    }
                }).catch(error => {
                    console.error(error.message)
                })
            }).catch(_ => {})
        },
        changeShow (row) {
            let sort = ''
            if (row.isshow === 0) {
                sort = 0
            } else {
                sort = 1
            }
            let params = {
                bid: row.bid,
                isshow: row.isshow,
                sort: sort
            }
            // this.$axios.post('/changeShow', params).then(res => {
            this.$axios.post(this.$api.banner.changeShow, params).then(res => {
                console.log(res)
                if (res.status === 200) {
                    row.isshow === 0 ? this.$message.error('已在首页中移除') : this.$message.success('已在首页中展示')
                    // this.$message.success(`${row.isshow === 0 ? '已在首页中移除' : '已在首页中展示'}`)
                    this.queryBanner()
                }
            }).catch(error => {
                console.error(error.message)
            })
        }
    },
    created () {
        this.queryBanner()
    }
}
</script>

<style lang="less" scoped>
</style>
