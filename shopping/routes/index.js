const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");
const { serialize } = require("v8");

// global 변수에 지정
// global.planningEventData = JSON.parse(fs.readFileSync("./data/planningEvent.json"));
// global.homeContentsData = JSON.parse(fs.readFileSync("./data/homeContents.json"));

router.use(express.json());
router.use(cors());
const planningEvent = JSON.parse(fs.readFileSync("./data/planningEvent.json"));
let mallEventListIndex = 0;

router.get("/event.json", function (req, res, next) {
  // const { planningEventData } = global;
  res.json(planningEvent.event);
  // console.log(JSON.parse(fs.readFileSync("./data/planningEvent.json")));
  // res.json(JSON.parse(fs.readFileSync("./data/planningEvent.json")));
});

router.get("/mileageList.json", function (req, res, next) {
  res.json(planningEvent.mileageList);
});

router.get("/mallEventList.json", function (req, res, next) {
  // console.log(planningEvent.mallEventList);
  if (mallEventListIndex >= planningEvent.mallEventList.length) {
    res.status(503).end("NO MORE DATA");
    mallEventListIndex = 0;
  }
  const presentMallEventList = planningEvent.mallEventList.slice(mallEventListIndex, mallEventListIndex + 5);
  mallEventListIndex += 5;
  console.log(presentMallEventList);
  res.json(presentMallEventList);
});

router.get("/homeContents.json", function (req, res, next) {
  // const { homeContentsData } = global;
  // res.json(homeContentsData);
  res.json(JSON.parse(fs.readFileSync("./data/homeContents.json")));
});

/* GET home page. */
// router.get("/", function (req, res, next) {
// res.render("index", { title: "Adela" });
// const { data } = global;
// res.send(data);
// res.render("index", test("Express", "../data/user.json"));
// });

module.exports = router;
