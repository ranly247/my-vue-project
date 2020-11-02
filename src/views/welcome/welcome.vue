<template>
    <div class="banner">
        <el-carousel trigger="click" height="540px">
            <el-carousel-item v-for="item in items" :key="item">
                <img :src="item">
            </el-carousel-item>
        </el-carousel>
        <!-- <span class="demonstration">这是首页</span> -->
    </div>
</template>

<script>
export default {
    name: 'welcome',
    data () {
        return {
            items: [
                '../../static/img/screenshots/luna1.jpg',
                '../../static/img/screenshots/luna2.jpg',
                '../../static/img/screenshots/luna3.jpg',
                '../../static/img/screenshots/luna4.jpg',
                '../../static/img/screenshots/luna5.jpg',
                '../../static/img/screenshots/luna6.jpg'
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.el-carousel__item {
    img {
        width: 100%;
        height: auto;
    }
}
.banner {
    width: 80%;
    height: 80%;
    margin: auto;
}
</style>
