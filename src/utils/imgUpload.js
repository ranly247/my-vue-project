'use strict'
module.exports = {
    upload (params) {
        let img = document.querySelector('.imgUpload')
        let file = img.files[0]
        if (file) {
            let name = file.name
            let reader = new FileReader()
            reader.onload = (event) => {
                let base64 = event.target.result
                let base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
                params.post('/src/main/upload', {
                    name,
                    file: base64Data
                }).then(res => {
                    let url = res.data.result.url
                    this.imgUrl = url
                })
            }
            reader.readAsDataURL(file) // 将 Blob 或 File 对象转成base64
        }
    }
}
