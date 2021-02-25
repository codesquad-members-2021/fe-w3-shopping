const express = require("express");
const router = express.Router();
const jsonData = require('../public/data/response.json');
const { best, event, carousel, box } = jsonData;
// const { query : { type, page, count }} = req;


router.get("/", (req, res, next) => {
    res.json([{ best, event, carousel, box }]);
});

module.exports = router;