var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs')

var indexRouter = require('./routes/index');
var companyRouter = require('./routes/company');

var app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'hbs')

app.use('/', indexRouter);

var usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.use('/api/company', companyRouter);

// catch error and forward to error handler
app.use((err,req, res, next) => {
  const status = err.statusCode || 500;
  return res.status(status).json({
    status: status,
    message: err.message,
    validation: err.validation
  });
})

module.exports = app;

