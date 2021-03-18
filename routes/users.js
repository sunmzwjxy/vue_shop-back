var express = require('express')
var myPool = require('../models/mysql.js')
var JwtUilt = require('../models/jwt.js')

var router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res) {
    let SQL_string = 'SELECT * FROM REPORT'

    let result = await (await myPool).query(SQL_string)
    res.send(result)
})

router.post('/login', async function (req, res) {
    var username = req.body.username
    var password = req.body.password

    let SQL_string = `SELECT * FROM USERS WHERE USERNAME='${username}'`
    let result = await (await myPool).query(SQL_string)

    if (password === result[0].password) {
        let jwt = new JwtUilt(username)
        let token = jwt.generateToken()
        res.send({ status: 200, msg: '登陆成功', token: token })
    } else {
        res.send({ status: 400, msg: '账号密码错误' })
    }
})

router.get('/userlist', async function (req, res, next) {
    let SQL_string = `select * from USERS WHERE USERNAME LIKE '%${req.query.query}%' limit ${(parseInt(req.query.pagenum) - 1) * req.query.pagesize},${req.query.pagesize}`

    let SQL_Count = 'SELECT COUNT(*) AS length FROM USERS'

    const totalcount = (await (await myPool).query(SQL_Count))[0].length
    const result = await (await myPool).query(SQL_string)

    let data = {
        pagenum: req.query.pagenum,
        total: totalcount,
        users: result,
    }

    res.send(data)
})

router.put('/user/:id/state/:status', async function (req, res, next) {
    let SQL_string = `UPDATE USERS SET status = ${req.params.status} WHERE ID=${req.params.id}`

    let result = await (await myPool).query(SQL_string)

    res.send(result)
})

router.post('/add', async function (req, res, next) {
    let SQL_string = `INSERT INTO USERS (username,password,mail,phone,type,role,status,create_time) VALUES ( '${req.body.username}', '${req.body.password}', '${req.body.mail}', '${req.body.phone}', 1, 'Operater', 0,NULL)`
    let result = await (await myPool).query(SQL_string)

    res.send(result)
})

router.put('/edit',async function(req,res,next) {
    let SQL_string = `UPDATE USERS SET username = '${req.body.username}', password = '${req.body.password}', mail = '${req.body.mail}', phone = '${req.body.phone}' WHERE ID=${req.body.id}`

    let result = await (await myPool).query(SQL_string)

    res.send(result)
})

router.delete('/delete',async function(req,res,next) {
    let SQL_string = `DELETE FROM USERS WHERE ID=${req.query.id}`

    let result = await (await myPool).query(SQL_string)

    res.send(result)
})
module.exports = router
