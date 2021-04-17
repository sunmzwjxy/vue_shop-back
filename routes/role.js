var express = require('express')
var myPool = require('../models/mysql.js')

var router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
    let SQL_string = `SELECT
    role.id
    , role.value
    ,role.comments
    , group_concat(role_permission.permission_id)  as per_id
FROM
    enrollment.role
    INNER JOIN enrollment.role_permission 
        ON (role.id = role_permission.role_id)
group by role.id`
    let roles = await(await myPool).query(SQL_string)

    SQL_string = `select * from permission`
    let result = await (await myPool).query(SQL_string)

    let permissionlist = []

    // 递归
    var getRoles = function (item,arr) {
        var value = {
            id: item.id,
            name: item.name,
            children: []
        }

        // 得到所有的子，并且子必须在角色的权限列表里面
        var childs = result.filter((currentValue) => {
            // 判断是否在角色的权限列表里面
            let first = arr.find(element => element === currentValue.id)
            // 根据父ID找子
            return currentValue.parent_id === item.id && first !== undefined
        })
        childs.forEach((element) => {
            var child = getRoles(element,arr)
            value.children.push(child)
        })
        return value
    }

    roles.forEach(element => {
        var per_ids = element.per_id.split(',').map(Number)

        const roots = result.filter(currentValue => {
            return currentValue.parent_id === 0 && per_ids.indexOf(currentValue.id) !== -1
        })
        roots.forEach(element => {
            permissionlist.push(getRoles(element,per_ids))
        })
        element.children = permissionlist
        permissionlist = []
    })

    res.send(roles)
})

module.exports = router
