const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 26~41 goody code
// data 폴더 안에 들어있는 json 파일들을 파싱하여 객체 안에 넣는다.
homeContents = JSON.parse(
  fs.readFileSync(__dirname + "/public/json/homeContents.json", "utf-8")
);
planningEvent = JSON.parse(
  fs.readFileSync(__dirname + "/public/json/planningEvent.json", "utf-8")
);

// localhost:3000/homeContents.json 으로 접근하면 파싱한 데이터가 렌더링된다. 
app.get("/homeContents.json", (req,res,next) => {
    res.json(homeContents);
})

app.get("/planningEvent.json", (req,res,next) => {
  res.json(planningEvent);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
