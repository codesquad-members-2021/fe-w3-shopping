/*역할
bin 디렉터리는 실제로 객체에 대한 활동을 제어하는 가장 중요한 부분이다. 
http 모듈을 통해 서버를 등록하고, 문제에 대해 직접 처리하는 역할을 수행한다. 
서버가 제대로 등록되었는지 오류 발생시 어떻게 처리 할 것인지를 명시해준다.
*/

/**서버에 필요한 객체 (http, 미들웨어) */
const app = require("./app");
const debug = require("debug")("fe-w3-shopping:server");
const http = require("http");
const port = normalizePort(process.env.PORT || "3000"); //서버 port 설정
app.set("port", port);

const server = http.createServer(app); //http 인스턴스 선언

/*서버 실행 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

//normalizePort 함수 ( 포트 번호 검사 )
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//에러 핸들링 함수
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// 서버 리스닝 종료 후 핸들링 함수
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
