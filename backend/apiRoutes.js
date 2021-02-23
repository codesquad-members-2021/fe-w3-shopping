import express from "../node_modules/express/lib/express.js";
import fs from "fs";
import path from "path";

const router = express.Router();

const __dirname = path.resolve()

const homeContentsData = fs.readFileSync(`${__dirname}/backend/data/homeContents.json`, 'utf8', (err, data) => {
  return data;
});
const planningEventsData = fs.readFileSync(`${__dirname}/backend/data/planningEvents.json`, 'utf8', (err, data) => {
  return data;
});

// JSON.parse(fs.readFileSync("data.json").toString()).length;

router.get("/planningEvents", (req, res) => {
  return res.status(200).send(planningEventsData);
});

// 페이지 네이션 작업 필요
router.get("/homeContents", (req, res) => {
  return res.status(200).send(homeContentsData);
});

export default router;
