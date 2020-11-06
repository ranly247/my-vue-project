<template>
    <div id="app">
        <header>
            <div class="logo">
                <img src="@/assets/logo3.png" alt="">
            </div>
            <nav>
                <ul>
                    <li v-for="item in arr1" :key="item.id">{{ item.value }}</li>
                </ul>
                <ol>
                    <li v-for="item in arr2" :key="item.id">{{ item.value }}</li>
                </ol>
            </nav>
            <div class="space">
                <div class="top"></div>
                <div class="bottom"></div>
            </div>
            <div class="input">
                <div class="header">
                    <el-input placeholder="" suffix-icon="el-icon-search" v-model="input" size="mini"/>
                </div>
                <ul>
                    <li v-for="item in arr3" :key="item.id">{{ item.value }}</li>
                </ul>
            </div>
        </header>
        <main>
            <img src="@/assets/main.jpg" alt="">
            <div class="content">
                <div class="new">SALE NOW!</div>
                <div class="title">ASSASSIN'S CREED ODYSSEY</div>
            </div>
        </main>
        <div class="banner">
            <div class="aboutTitle">轮播图</div>
            <el-carousel trigger="click" @change="change">
                <el-carousel-item v-for="item in banner" :key="item.bid">
                    <img :src="item.img">
                </el-carousel-item>
            </el-carousel>
            <div class="about">
                <div class="bannerTitle">{{ bannerTitle }}</div>
                <div class="bannerContent">{{ bannerAbout }}</div>
            </div>
        </div>
        <div class="mainContent">
            <div class="news">
                <div class="newsHeader">新闻</div>
                <div class="newsItem" v-for="item in newsArr" :key="item.nid">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="publishDay">
                        <img v-show="item.newsType === 1" src="@/assets/lbl_game.png" alt="">
                        <img v-show="item.newsType === 2" src="@/assets/lbl_other.png" alt="">
                        <img v-show="item.newsType === 3" src="@/assets/lbl_magazine.png" alt="">
                        <img v-show="item.newsType === 4" src="@/assets/lbl_music.png" alt="">
                        <span>{{ item.publishDay }}</span>
                    </div>
                    <div class="newsTitle">{{ item.title }}</div>
                    <div class="more" @click="more(item)">详细内容</div>
                </div>
                <div class="newsHeader">关联店铺</div>
                <div class="newsItem" v-for="item in cafe" :key="item.index">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="newsTitle">{{ item.title }}</div>
                </div>
                <div class="newsHeader">街机频道</div>
                <div class="newsItem">
                    <div class="img">
                        <img src="@/assets/edamame.jpg" alt="">
                    </div>
                    <div class="newsTitle">EDAMAME街机频道</div>
                </div>
                <div class="newsHeader">其他游戏</div>
                <div class="ogame" v-for="item in game" :key="item.index">
                    <div class="ogameImg">
                        <img :src="item.img" alt="">
                    </div>
                    <span>{{ item.title }}</span>
                </div>
            </div>
            <div class="shopping">
                <div class="shoppingHeader">实体商品</div>
                <div class="date">2020年11月</div>
                <div class="shopItem" v-for="item in shopping" :key="item.ssid">
                    <img :src="item.img" alt="">
                    <div class="shopAbout">
                        <div class="shopTitle">{{ item.title }}</div>
                        <div class="shopPublishDay">{{ item.publishDay }}</div>
                        <div class="shopPrice">{{ item.price }}円(税后)</div>
                        <img v-show="item.shoppingType === 1" src="@/assets/lbl_game.png" alt="">
                        <img v-show="item.shoppingType === 2" src="@/assets/lbl_other.png" alt="">
                        <img v-show="item.shoppingType === 3" src="@/assets/lbl_magazine.png" alt="">
                    </div>
                </div>
                <div class="shoppingHeader">E-stroe</div>
                <div class="shopItem" v-for="item in store" :key="item.index">
                    <img :src="item.img" alt="">
                    <div class="shopAbout">
                        <div class="shopTitle">{{ item.title }}</div>
                        <div class="shopPublishDay">{{ item.publishDay }}</div>
                        <div class="shopPrice">{{ item.price }}円(税后)</div>
                        <img v-show="item.shoppingType === 1" src="@/assets/lbl_game.png" alt="">
                        <img v-show="item.shoppingType === 2" src="@/assets/lbl_other.png" alt="">
                        <img v-show="item.shoppingType === 3" src="@/assets/lbl_magazine.png" alt="">
                        <img v-show="item.shoppingType === 4" src="@/assets/lbl_music.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <footer>
        </footer>
        <edit-dialog v-model="editDialog" :dialogData="rowData"/>
    </div>
</template>

<script>
import editDialog from './editDialog'
export default {
    name: 'officeWebsite',
    components: {
        editDialog
    },
    data () {
        return {
            arr1: [{
                id: 1,
                value: '游戏'
            }, {
                id: 2,
                value: '杂志'
            }, {
                id: 3,
                value: '唱片'
            }, {
                id: 4,
                value: '其他'
            }],
            arr2: [{
                id: 1,
                value: '商店'
            }, {
                id: 2,
                value: '会员'
            }, {
                id: 3,
                value: '视频'
            }],
            arr3: [{
                id: 1,
                value: '公司信息'
            }, {
                id: 2,
                value: '就业信息'
            }, {
                id: 3,
                value: '后台'
            }],
            input: '',
            banner: [],
            bannerTitle: '',
            bannerAbout: '',
            newsArr: [],
            editDialog: false,
            rowData: [],
            shopping: [],
            store: [],
            cafe: [{
                cid: 1,
                img: 'https://pic.downk.cc/item/5f4e1aab160a154a678a1f6a.jpg',
                title: 'Altonia(东新宿区)'
            }, {
                cid: 2,
                img: 'https://pic.downk.cc/item/5f4e1ab6160a154a678a2d89.jpg',
                title: 'Square Enix Cafe(秋叶原)'
            }, {
                cid: 3,
                img: 'https://pic.downk.cc/item/5f4e1ab0160a154a678a26d1.jpg',
                title: '大版广场咖啡厅(梅田)'
            }],
            game: [{
                gid: 1,
                img: 'https://pic.downk.cc/item/5f4eed3f160a154a67c83f0d.png',
                title: '极端的边缘'
            }, {
                gid: 2,
                img: 'https://pic.downk.cc/item/5f4eed09160a154a67c835b5.jpg',
                title: '百万亚瑟王'
            }, {
                gid: 3,
                img: 'https://pic.downk.cc/item/5f4eed29160a154a67c83b19.png',
                title: '佐贺'
            }, {
                gid: 4,
                img: 'https://pic.downk.cc/item/5f4eece3160a154a67c82f47.png',
                title: '王国之心'
            }, {
                gid: 5,
                img: 'https://pic.downk.cc/item/5f4eec7f160a154a67c81f0e.png',
                title: '勇者斗恶龙'
            }, {
                gid: 6,
                img: 'https://pic.downk.cc/item/5f4eecbb160a154a67c827dd.png',
                title: '最终幻想'
            }]
        }
    },
    methods: {
        queryBanner () {
            this.$axios.get('/index/queryBanner').then(res => {
                if (res.status === 200) {
                    // console.log(res.data)
                    this.banner = res.data
                    this.bannerTitle = this.banner[0].title
                    this.bannerAbout = this.banner[0].about
                }
            }).catch(error => {
                console.error(error.message)
            })
        },
        change (index) {
            this.bannerTitle = this.banner[index].title
            this.bannerAbout = this.banner[index].about
        },
        queryNews () {
            this.$axios.get('/index/queryNews').then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.newsArr = res.data
                    this.newsArr.forEach((e, index) => {
                        this.newsArr[index].publishDay = this.$fd.formateDate(this.newsArr[index].publishDay)
                    })
                }
            }).catch(error => {
                console.error(error.message)
            })
        },
        more (params) {
            this.editDialog = true
            this.rowData = params
            // console.log(this.newsArr[params].about)
        },
        querySale () {
            this.$axios.get('/index/querySale').then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.shopping = res.data
                    this.shopping.forEach((e, index) => {
                        this.shopping[index].publishDay = this.$fd.formateDate(this.shopping[index].publishDay)
                    })
                }
            }).catch(error => {
                console.error(error.message)
            })
        },
        queryStroe () {
            this.$axios.get('/index/queryEstore').then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.store = res.data
                    this.store.forEach((e, index) => {
                        this.store[index].publishDay = this.$fd.formateDate(this.store[index].publishDay)
                    })
                }
            }).catch(error => {
                console.error(error.message)
            })
        }
    },
    created () {
        this.queryBanner()
        this.queryNews()
        this.querySale()
        this.queryStroe()
    }
}
</script>

<style lang="less" scoped>
@import 'officeWebsite.less';
</style>
