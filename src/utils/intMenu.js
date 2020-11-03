'use strict'
module.exports = {
    menu: {
        news: {
            children: [
                {
                    disabled: false,
                    menuIcon: '',
                    menuId: 222,
                    menuName: 'quick news',
                    menuPath: 'news',
                    menuRemark: '“我是备注”',
                    parentMenuId: 22
                }
            ],
            disabled: false,
            menuIcon: 'el-icon-news',
            menuId: 22,
            menuName: '新闻管理',
            menuPath: 'b',
            menuRemark: '',
            parentMenuId: 0
        },
        banner: {
            children: [
                {
                    disabled: false,
                    menuIcon: '',
                    menuId: 11,
                    menuName: 'banner',
                    menuPath: 'banner',
                    menuRemark: '“我是备注”',
                    parentMenuId: 1
                }
            ],
            disabled: false,
            menuIcon: 'el-icon-location-information',
            menuId: 1,
            menuName: 'banner管理',
            menuPath: 'a',
            menuRemark: '',
            parentMenuId: 0
        },
        sale: {
            children: [
                {
                    disabled: false,
                    menuIcon: '',
                    menuId: 3333,
                    menuName: 'sale',
                    menuPath: 'sale',
                    menuRemark: '“我是备注”',
                    parentMenuId: 333
                },
                {
                    disabled: false,
                    menuIcon: '',
                    menuId: 33333,
                    menuName: 'estore',
                    menuPath: 'estore',
                    menuRemark: '“我是备注”',
                    parentMenuId: 333
                }
            ],
            disabled: false,
            menuIcon: 'el-icon-shopping-bag-1',
            menuId: 333,
            menuName: '商品管理',
            menuPath: 'c',
            menuRemark: '',
            parentMenuId: 0
        },
        ranly: {
            children: [
                {
                    disabled: false,
                    menuIcon: '',
                    menuId: 444444,
                    menuName: '用户权限管理',
                    menuPath: 'account',
                    menuRemark: '“我是备注”',
                    parentMenuId: 333
                }
            ],
            disabled: false,
            menuIcon: 'el-icon-user',
            menuId: 444,
            menuName: '账号管理',
            menuPath: 'd',
            menuRemark: '',
            parentMenuId: 0
        }
    }
}
