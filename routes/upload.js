var express = require('express')
var multipart = require('connect-multiparty')
var uploader = require('../models/uploader-node.js')('temp');
var multipartMiddleware = multipart()
var router = express.Router()

// Configure access control allow origin header stuff
var ACCESS_CONTROLL_ALLOW_ORIGIN = true

/* GET upload listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a node')
})

router.post('/', multipartMiddleware, function (req, res) {
    uploader.post(req, function (status, filename, original_filename, identifier) {
        console.log('POST', status, original_filename, identifier)
        if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'content-type')
        }
        setTimeout(function () {
            res.send(status)
        }, 500)
    })
})

router.post('/merge_chunk',function(req,res) {
    // upload file locate full path
    // writableStream = fs.createWriteStream(path.join())
    // uploader.write()
})

router.options('/', function (req, res) {
    console.log('OPTIONS')
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'content-type')
    }
    res.status(200).send()
})

module.exports = router
