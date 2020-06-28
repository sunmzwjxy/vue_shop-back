var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')
var JwtUilt = require('./models/jwt.js')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var noteRouter = require('./routes/note')
var introductionRouter = require('./routes/introduction')
var history = require('connect-history-api-fallback')

var app = express()

// view engine setup
//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'jade')

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With,Content-Type,Content-Length,Authorization,Accept'
    )
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8')
    if (req.method.toLowerCase() == 'options') {
        res.send(200)
    } else {
        next()
    }
})

app.use(
    history({
        rewrites: [
            {
                from: /^\/note\/.*$/,
                to: function (context) {
                    return context.parsedUrl.pathname
                },
            },
            {
                from: /^\/introduction\/.*$/,
                to: function (context) {
                    return context.parsedUrl.pathname
                },
            },
            {
                from: /^\/users\/.*$/,
                to: function (context) {
                    return context.parsedUrl.pathname
                },
            },
        ],
    })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
    if (req.url != '/users/login' && req.url != '/users/register') {
        let token = req.headers.authorization
        let jwt = new JwtUilt(token)
        let result = jwt.verifyToken()
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            console.log(result)
            res.send({ status: 403, msg: '登录已过期,请重新登录' })
            // res.render('login.html');
        } else {
            next()
        }
    } else {
        next()
    }
})

app.use('/', indexRouter) // Home
app.use('/users', usersRouter) // Users

/////////
app.use('/note', noteRouter) // Test
app.use('/introduction', introductionRouter) // Test

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
