<template>
    <div>
        <p class="login">
            {{ title }}
        </p>
    </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        return {
            title: 'this is a login page!'
        }
    }
}
</script>
<style lang="less" scoped>
@import './login.less';
</style>
