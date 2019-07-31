var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Routes
const apiRouter = require('./routes/api');

//

var app = express();
const mongoConn = require('./config/mongodb');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
app.use('/api', apiRouter);






module.exports = app;
