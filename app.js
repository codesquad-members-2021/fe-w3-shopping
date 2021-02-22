const { log } = console;
const express = require('express');
const path = require('path');
const api = require('./api');
const app = express();
const port = 8080;

app.listen(port, () =>
    log(`Express Server is running at ${port} port ...\nIf you want to go live Server , then enter "localhost:${port}"`
    ));

app.use('/api', api);
app.use(express.static(path.join(__dirname, 'src')));
app.use((req, res) => res.sendStatus(404))

// __dirname = Users/parkjeonghyeon/coding/FE_masters_class/express-server (app.js가 있는 디렉토리)
