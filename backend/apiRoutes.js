import express from "../node_modules/express/lib/express.js";
import fs from "fs"

const router = express.Router();
// 테스트 시 해당 변수 변경 필요 0223
const __dirname = "/Users/jaeuk/Documents/ppamppamman/fe-w3-shopping/backend";

const homeContentsData = fs.readFileSync(`${__dirname}/data/homeContents.json`, 'utf8', (err, data) => {
  return data;
});
const planningEventsData = fs.readFileSync(`${__dirname}/data/planningEvents.json`, 'utf8', (err, data) => {
  return data;
});

// JSON.parse(fs.readFileSync("data.json").toString()).length;

router.get("/planningEvents", (req, res) => {
  // console.log(homeContentsData)
  return res.status(200).send(planningEventsData);
});

// 페이지 네이션 작업 필요
router.get("/homeContents", (req, res) => {
  
  return res.status(200).send(homeContentsData);
});

export default router;
