// express 함수 불러옴
const express = require('express');
// 불러옴 함수를 실행해줌
const app = express();
app.listen(3000, function() {
    console.log('start!!! express server on port 3000');
});
// 비동기로 코드가 진행된다. 

app.get('/', function(req,res) {
    res.sendFile("/Users/luke/Documents/gitStorage/fe-w3-shopping/index.html")
});