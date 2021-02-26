// express 함수 불러옴
const express = require('express');
// 불러옴 함수를 실행해줌
const app = express();
// const bodyParser = require('body-parser');
app.listen(3000, function() {
    console.log('start!!! express server on port 3000');
});

// for(let i=0; i<100; i++) {
//     console.log(i);
// }

app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html")
});

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/src/main.js")
});
