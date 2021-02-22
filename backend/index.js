import express from "../node_modules/express/lib/express.js";

// var express = require('express');
const app = express();
const port = 3033;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/homeContents', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// "response": {
//   "code": "200",
//   "message": "OK"
// }