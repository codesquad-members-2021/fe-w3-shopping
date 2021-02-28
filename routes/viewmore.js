const express = require("express");
const router = express.Router();
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./public/data/response.json", "utf8"));

router.get("/", (req, res, next) => {
  res.json(data["mallEvent"]);
});

module.exports = router;
