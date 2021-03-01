//서버에서 사용하게 될 미들웨어
/*-------express 객체 선언 부, 우리가 사용할 미들웨어를 비롯해 Express 제공 미들웨어 객체 선언------*/
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const cors = require("cors"); //여기
//-------------------------------------------------------------------------------

const indexRouter = require("./routes/index"); // 라우터 선언
const topCarouselRouter = require("./routes/topCarousel");
const viewmoreRouter = require("./routes/viewmore");

const app = express(); //미들웨어 등록을 위해 app 객체에 express 객체 등록
// view engine setup : app.set 메서드를 통해 express 앱 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//-------------------------------------
//미들웨어 등록 시작
app.use(cors()); //인증추가
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/topCarousel", topCarouselRouter); //
app.use("/viewmore", viewmoreRouter); //

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//미들웨어 등록 종료

module.exports = app; //app 객체 사용할 수 있도록 모듈에 등록함(export)
