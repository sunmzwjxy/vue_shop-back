var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html', { title: 'Express' })
})

router.get('/menus', function (req, res) {
    let data = [
        {
            id: 101,
            authName: '用户管理',
            path: '',
            children: [
                {
                    id: 1011,
                    authName: '用户列表',
                    path: '/home/userlist',
                    children: [],
                },
            ],
        },
        {
            id: 102,
            authName: '权限管理',
            path: '',
            children: [
                {
                    id: 1021,
                    authName: '角色列表',
                    path: '/home/rolelist',
                    children: [],
                },
                {
                    id: 1022,
                    authName: '权限列表',
                    path: '/home/rightlist',
                    children: [],
                },
            ],
        },
        {
            id: 103,
            authName: '商品管理',
            path: '',
            children: [
                {
                    id: 1031,
                    authName: '商品列表',
                    path: '/home/goodslist',
                    children: [],
                },
                {
                    id: 1032,
                    authName: '分类参数',
                    path: '/home/classifyparam',
                    children: [],
                },
                {
                    id: 1033,
                    authName: '商品分类',
                    path: '/home/goodsclassify',
                    children: [],
                },
            ],
        },
        {
            id: 104,
            authName: '订单管理',
            path: '',
            children: [
                {
                    id: 1041,
                    authName: '订单列表',
                    path: '/home/booklist',
                    children: [],
                },
            ],
        },
        {
            id: 105,
            authName: '数据统计',
            path: '',
            children: [
                {
                    id: 1051,
                    authName: '数据列表',
                    path: '/home/datalist',
                    children: [],
                },
            ],
        },
    ]

    res.send(data)
})

module.exports = router
