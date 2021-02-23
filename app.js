const express = require('express');
const path = require('path');
const app = express();

app.set('port', 3000);
// app.set('views', __dirname+ '/views')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.locals.banner = require('./public/data/planningEvent.json');
app.locals.contents = require('./public/data/homeContents.json');

app.get('/', (req, res) => {
    res.render("index", {});
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});