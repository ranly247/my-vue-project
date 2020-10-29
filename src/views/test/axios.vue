<template>
    <div>
        <button @click="getData">{{ message }}</button>
        <button @click="getData2">{{ message2 }}</button>
        <main>
            <table>
                <tr>
                    <td>编号</td>
                    <td>标题</td>
                    <td>介绍</td>
                    <td>封面</td>
                    <td>操作</td>
                </tr>
                <tr v-for="item in bannerList" :key="item.bid">
                    <td class="id">{{ item.bid }}</td>
                    <td class="name">{{ item.title }}</td>
                    <td class="age">{{ item.about }}</td>
                    <td class="sex">
                        <img :src="item.img" alt="">
                    </td>
                    <td>
                        <button @click="del(item.name)">删除</button>
                        <button @click="edit(item)">修改</button>
                        <button @click="change(item.id)">change</button>
                    </td>
                </tr>
            </table>
        </main>
    </div>
</template>
<script>
export default {
    name: 'axios',
    data () {
        return {
            message: '来吧，午夜！',
            message2: '来吧，午夜！2',
            bannerList: []
        }
    },
    created () {
        this.getData()
    },
    methods: {
        getData () {
            this.$axios.get('/index/queryBanner').then(res => {
                this.bannerList = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        getData2 () {
            this.$axios.get('/index/queryMain').then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import './axios.less';
</style>
