const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");

router.use(express.json());
router.use(cors());

const planningEvent = JSON.parse(fs.readFileSync("./data/planningEvent.json"));
const homeContents = JSON.parse(fs.readFileSync("./data/homeContents.json"));

let mallEventListIndex = 0;
let isDoneOfMallEventList = false;

router.get("/event.json", function (req, res, next) {
  res.json(planningEvent.event);
});

router.get("/mileageList.json", function (req, res, next) {
  res.json(planningEvent.mileageList);
});

router.get("/mallEventList.json", function (req, res, next) {
  if (isDoneOfMallEventList) return;
  if (mallEventListIndex >= planningEvent.mallEventList.length) {
    res.status(503).end("NO MORE DATA");
    mallEventListIndex = 0;
    isDoneOfMallEventList = true;
  }
  const presentMallEventList = planningEvent.mallEventList.slice(mallEventListIndex, mallEventListIndex + 5);
  mallEventListIndex += 5;
  res.json(presentMallEventList);
});

router.get("/hotdeal.json", function (req, res, next) {
  const hotdealItems = homeContents.contents.slice(0, 10);
  res.json(hotdealItems);
});

router.get("/keyword.json", function (req, res, next) {
  const keywordItems = homeContents.contents.slice(20, 23);
  res.json(keywordItems);
});

router.get("/how__relate.json", function (req, res, next) {
  const howRelateItems = homeContents.contents.slice(23, 24);
  res.json(howRelateItems);
});

router.get("/how__same.json", function (req, res, next) {
  const howSameItems = homeContents.contents.slice(24, 25);
  res.json(howSameItems);
});

router.get("/partners.json", function (req, res, next) {
  res.json(JSON.parse(fs.readFileSync("./data/partners.json")));
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Adela" });
});

module.exports = router;
