const createError = require('http-errors');
const path = require('path');//패스 지정용 모듈
const express = require('express');//express 함수를 반환
const app = express();
const cors = require('cors');//CORS 미들웨어 객체 선언
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev')); //미들웨어: 요청과 응답에 대한 로그를 보여줌.
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //req.on('data'), req.on('end')를 해석하는 용도.
app.use(cookieParser());
//미들웨어 설명: https://www.youtube.com/watch?v=6vwMv6tH3O4
//라우팅하는 미들웨어. Express의 '정적'파일이 모여있는 폴더 경로를 전달. 불러오는 모든 static 파일의 출처는 'public' 폴더로 기억하도록 등록해주는 작업. public이라는 디렉토리를 static으로 기억하게 된다.
app.use(express.static(path.join(__dirname, 'public')));
// app.get('/main', function(req, res) { //여기서 가로채면 터미널에서 hello world!를 출력.
//   res.send('<h1>Hello World!</h1><br><h2>여기는 비었지롱! 127.0.0.1:3000(혹은 localhost:3000)으로 가세요~</h2>');
//   console.log('hello world!');
//   console.log("여기는 비었지롱! 127.0.0.1:3000(혹은 localhost:3000)으로 가세요~")
// })
const indexRouter = require('./routes/index'); //라우터 파일 연결.
const usersRouter = require('./routes/users');
const imageRouter = require('./routes/image');
app.use('/', indexRouter); //여기서 기본 이미지들을 요청해야한다.
app.use('/users', usersRouter); //hi friend 출력. user.js참고.
app.use('/image', imageRouter);


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
