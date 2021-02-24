const express = require('express');
const router = express.Router();
const path = require('path');

/* GET users listing. */
router.get('/mileageList', function (req, res, next) {
  res.contentType('text/json');

  let option = {
    root: path.join(__dirname, '../serverData'),
  };
  res.sendFile('mileageList.json', option);
});

router.get('/mallEventList', function (req, res, next) {
  res.contentType('application/json');
  let option = {
    root: path.join(__dirname, '../serverData'),
  };
  res.sendFile('mallEventList.json', option);
});

module.exports = router;
