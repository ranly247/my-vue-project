module.exports = {
    obj: {
        a: 1,
        fn (params) {
            params = params + 1
            this.show = this.show + 4
            this.a = this.a + params
        }
    }
}
