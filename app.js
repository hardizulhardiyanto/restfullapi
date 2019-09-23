var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')
mongoose.set('useFindmAndModify', false);
mongoose.connect('mongodb://localhost/CMS', {
    useCreateIndex: true,
    useNewUrlParser: true
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var dataDatesRouter = require('./routes/dataDates');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/data', dataRouter);
app.use('/api/dataDates', dataDatesRouter);


module.exports = app;
