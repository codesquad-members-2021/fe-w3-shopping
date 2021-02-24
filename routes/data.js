const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/1', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/data/homeContents.json'));
});

router.get('/2', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/data/planningEvent.json'));
});

module.exports = router;
