import express from "../node_modules/express/lib/express.js";
import fs from "fs"

const router = express.Router();

// require("./data.json");

// json ES6 import가 어려워서 require 사용
// 임시
export const homeContents = require("./data/homeContents.json");
export const planningEvents = require("./data/planningEvents.json");

console.log(homeContents);
// const allDataCount = JSON.parse(fs.readFileSync("data.json").toString()).length;