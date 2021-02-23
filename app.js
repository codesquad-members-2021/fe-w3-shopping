const { log } = console;
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res) => res.sendStatus(404));

app.listen(port, () => log(`The server is listening at ${port}`));
