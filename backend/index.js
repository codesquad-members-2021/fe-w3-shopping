
import express from "express";
import cors from "cors";
import fs from "fs"

import { default as apiRoutes } from "./apiRoutes.js";

const app = express();
const port = 3333;
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});