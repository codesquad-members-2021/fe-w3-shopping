/**
 * /app.js
 */
// express 모듈 인스턴스 작성
const express = require('express');
const app = express();
// 패스 지정용 모듈
const path = require('path');

// 3000번 포트로 기다림
app.listen(3000, () => {
    console.log('Running at Port 3000...');
});

// 요청 파일 루팅
app.use(express.static(path.join(__dirname, 'public')));

// 기타 리퀘스트에 대한 404 에러
app.use((req, res) => {
    res.sendStatus(404);
});