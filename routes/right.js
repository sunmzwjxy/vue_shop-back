    var express = require('express')
var myPool = require('../models/mysql.js')

var router = express.Router()

/* GET rights listing. */
router.get('/', async function (req, res, next) {
    let SQL_string = `SELECT * FROM permission`

    let result = await (await myPool).query(SQL_string)
    res.send(result)
})


module.exports = router
