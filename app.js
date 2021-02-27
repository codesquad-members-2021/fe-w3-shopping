const { log } = console;
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/rightpannel1', (req, res) => {
    res.sendFile(__dirname + "/src/img/rightpannel1.png")
})
app.get('/rightpannel2', (req, res) => {
    res.sendFile(__dirname + "/src/img/rightpannel2.png")
})
app.get('/rightpannel3', (req, res) => {
    res.sendFile(__dirname + "/src/img/rightpannel3.png")
})

app.listen(port, () => log(`The server is listening at ${port}`));
