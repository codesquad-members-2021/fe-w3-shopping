const express = require('express')
const http = require('http')

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next)=>{
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
    res.write('<h1>express test</h1>')
})

http.createServer(app).listen(app.get('port'), ()=>{
    console.log(app.get('port'))
})