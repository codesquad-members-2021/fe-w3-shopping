const express = require('express');
const router = express.Router();
const path = require('path');
const CONTENTS_TYPE = 'application/json';
const ROOT_PATH = '../serverData';
const JSON_DATA = {
  mileageList: { path: '/mileageList', file: 'mileageList.json' },
  mallEventList: { path: '/mallEventList', file: 'mallEventList.json' },
  hotDealList: { path: '/hotDealList', file: 'hotDealList.json' },
  shoppingPartner: { path: '/shoppingPartner', file: 'shoppingPartner.json' },
};

const option = {
  root: path.join(__dirname, ROOT_PATH),
};

/* GET item listing. */

router.get(JSON_DATA.mileageList.path, function (req, res, next) {
  res.contentType(CONTENTS_TYPE);
  res.sendFile(JSON_DATA.mileageList.file, option);
});

router.get(JSON_DATA.mallEventList.path, function (req, res, next) {
  res.contentType(CONTENTS_TYPE);
  res.sendFile(JSON_DATA.mallEventList.file, option);
});

router.get(JSON_DATA.hotDealList.path, function (req, res, next) {
  const resFile = require(`${ROOT_PATH}/${JSON_DATA.hotDealList.file}`);
  const start = req.query.start;
  const count = req.query.count;
  const responseData = { list: resFile.hotdealList.slice(start, count), dataLength: resFile.hotdealList.length };
  res.send(responseData);
});

router.get(JSON_DATA.shoppingPartner.path, function (req, res, next) {
  res.contentType(CONTENTS_TYPE);
  res.sendFile(JSON_DATA.shoppingPartner.file, option);
});

module.exports = router;
