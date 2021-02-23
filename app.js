const express = require('express');
const app = express();

app.set('port', 3000);
// app.set('views', __dirname+ '/views')
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.locals.homeContents = require('./public/data/homeContents.json');

app.get('/', (req, res) => {
    res.render("index", {});
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});