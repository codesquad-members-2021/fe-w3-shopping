const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', function (req, res, next) {
  const rawdata = fs.readFileSync(
    path.resolve(__dirname, '../public/data/homeContents.json')
  );
  const data = JSON.parse(rawdata);
  res.json(data);
});

module.exports = router;
