'use strict'
module.exports = {
    // 数据库DATE类型返回的数据为国际标准时间，将它转换为中国北京时间
    formateDate (datetime) {
        function addDateZero (num) {
            return (num < 10 ? '0' + num : num)
        }
        let d = new Date(datetime)
        let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate())
        return formatdatetime
    }
}
