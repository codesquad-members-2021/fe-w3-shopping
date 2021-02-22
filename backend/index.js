import express from "../node_modules/express/lib/express.js";
import cors from "../node_modules/cors/lib/index.js";
import { homeContents, planningEvents } from "./routes.js"; // 임시

// var express = require('express');
// const cors = require('cors')

const app = express();
const port = 3033;

app.use(cors());
// app.use(express.static(`${__dirname}/public`))
// app.use('/api', routes)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/homeContents', (req, res) => {
  // console.log(homeContents)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// "response": {
//   "code": "200",
//   "message": "OK"
// }