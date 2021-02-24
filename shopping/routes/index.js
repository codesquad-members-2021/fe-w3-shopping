const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");

router.use(express.json());
router.use(cors());
const planningEvent = JSON.parse(fs.readFileSync("./data/planningEvent.json"));
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
    mallEventListIndex = 5;
  }
  const presentMallEventList = planningEvent.mallEventList.slice(mallEventListIndex, mallEventListIndex + 5);
  mallEventListIndex += 5;
  res.json(presentMallEventList);
});

router.get("/homeContents.json", function (req, res, next) {
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
