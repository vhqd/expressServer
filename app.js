var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { Mongoose } = require('./untils/config')
var JwtUtil = require('./untils/jwt');
var cors = require('cors');

var app = express();

app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:9528'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'x-requested-with', 'X-Token']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    // 把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
    console.log('');
    console.log('......请求地址开始......');
    console.log(req.url);
    console.log('......请求传值结束......');
    console.log('');
    if (req.url != '/user/login' && req.url != '/user/register') {
        let token = req.headers['x-token'];
        console.log(req.headers);

        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            console.log(result);
            res.send({ status: 403, msg: '登录已过期,请重新登录' });
            // res.render('login.html');
        } else {
            next();
        }
    } else {
        next();
    }
});

app.use('/test', require('./routes/test'));
app.use('/user', require('./routes/user'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
Mongoose.connect();
module.exports = app;
