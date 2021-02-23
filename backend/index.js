import express from "../node_modules/express/lib/express.js";
import cors from "../node_modules/cors/lib/index.js";
import fs from "fs"
// const cors = require('cors')

import {default as apiRoutes} from "./apiRoutes.js";

const app = express();
const port = 3333;
// app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});