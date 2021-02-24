var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Adela" });
  const { data } = global;
  res.send(data);
  // res.render("index", test("Express", "../data/user.json"));
});

module.exports = router;
