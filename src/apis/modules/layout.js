// layout界面所有接口
const Layout = {
    queryMenu: (data) => this.$axios.get('/queryMenu', data)
}
export default {
    Layout
}
