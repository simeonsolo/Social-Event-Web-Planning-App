var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/* connecting database */
// use mysql
var mysql = require('mysql');

// creating pool
var dbConnectionPool = mysql.createPool({
    host: '127.0.0.1', // 'localhost' will not work
    user: 'root',
    password: '123',
    database: 'CombinedCalendars'
  });

/* connecting cookies */
var session = require('express-session');

var app = express();

// middleware
app.use(function(req,res,next) {
  req.pool = dbConnectionPool;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8080);

app.use(session({
  secret: 'string',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
