const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/1', function (req, res, next) {
  const rawdata = fs.readFileSync(
    path.join(__dirname, '../public/data/homeContents.json')
  );
  const data = JSON.parse(rawdata);
  res.json(data);
});

router.get('/2', function (req, res, next) {
  const rawdata = fs.readFileSync(
    path.join(__dirname, '../public/data/planningEvent.json')
  );
  const data = JSON.parse(rawdata);
  res.json(data);
});

module.exports = router;
