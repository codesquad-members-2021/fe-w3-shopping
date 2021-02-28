const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");

router.use(express.json());
router.use(cors());

const planningEvent = JSON.parse(fs.readFileSync("./data/planningEvent.json"));
const homeContents = JSON.parse(fs.readFileSync("./data/homeContents.json"));

let mallEventListIndex = 0;

router.get("/event.json", function (req, res, next) {
  res.json(planningEvent.event);
});

router.get("/mileageList.json", function (req, res, next) {
  res.json(planningEvent.mileageList);
});

router.get("/mallEventList.json", function (req, res, next) {
  if (mallEventListIndex >= planningEvent.mallEventList.length) {
    res.status(503).end("NO MORE DATA");
    mallEventListIndex = 0;
  }
  const presentMallEventList = planningEvent.mallEventList.slice(mallEventListIndex, mallEventListIndex + 5);
  mallEventListIndex += 5;
  res.json(presentMallEventList);
});

router.get("/hotdeal.json", function (req, res, next) {
  const hotdealItems = homeContents.contents.slice(0, 40);
  res.json(hotdealItems);
});

router.get("/keyword.json", function (req, res, next) {
  const keywordItems = homeContents.contents.slice(45, 50);
  res.json(keywordItems);
});

router.get("/how.json", function (req, res, next) {
  const howItems = homeContents.contents.slice(60, homeContents.length);
  res.json(howItems);
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Adela" });
});

module.exports = router;
