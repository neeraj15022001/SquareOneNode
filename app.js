var express = require('express');
var app = express();
var createError = require('http-errors');
var path = require('path');
var db = require("./config/mongoose");
var cookieParser = require('cookie-parser');
var session = require("express-session");
var MongoStore = require("connect-mongo");
var logger = require('morgan');
var sassMiddleware = require('@gompa/node-sass-middleware');
var expressLayouts = require('express-ejs-layouts');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.set("layout extractMetas", true)

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session(
    {
        name: "squareOneCookie",
        saveUninitialized: false,
        secret: "squareOneSecret",
        resave: false,
        cookie: {
            maxAge: (1000 * 60 * 100),
        },
        store: MongoStore.create({
            mongoUrl: "mongodb://localhost:27017/squareOne",
            autoRemove: 'disabled'
        }, (err) => {
            console.log(err || "connect-mongo success OK")
        })
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(passport.setAuthenticatedUser)
app.use(logger('dev'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
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

module.exports = app;
