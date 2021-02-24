const express = require('express');
const ejs = require('ejs');
const path = require('path');

const i_router =require('./api/index');
const app =  express();
app.locals.homeContents = require('./api/homeContents.json');

app.set("view engine","ejs");
app.engine('ejs',require('ejs').renderFile);


app.use(express.static(path.join(__dirname,'public')));
app.use('/',i_router);
app.listen(3000,(err)=>{
    if(err) return console.log(err);
    console.log('The server is listening on port 3000');
});
//get 메서드의 url 이 기본값이 되게 되면 h1 출력
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.ejs');
});

app.use((req,res)=>{
    res.sendStatus(404);
})