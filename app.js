// express 함수 불러옴
const express = require('express');
// 불러옴 함수를 실행해줌
const app = express();
app.listen(3000, function() {
    console.log('start!!! express server on port 3000');
});

app.use(express.static('public'));

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html")
});

app.get('/main', function(req,res) {
    res.sendFile(__dirname + "/public/index.html")
});
