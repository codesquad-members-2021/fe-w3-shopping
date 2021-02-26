var express = require("express");
var router = express.Router();
var fs = require("fs");
const homeContent = require("../public/images/homeContents.json");
const planningEvent = require("../public/images/planningEvent.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Shoppinghow",
    home: homeContent,
    event: planningEvent,
  });
});

router.get("/homeContents.json", (req, res, next) => {
  res.send(homeContent);
});

router.get("/moreItem.json", (req, res, next) => {
  res.send(planningEvent);
});


module.exports = router;
