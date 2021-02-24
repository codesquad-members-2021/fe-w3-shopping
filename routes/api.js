const moreData = require('../data/more.js');

const express = require('express');
const router = express.Router();

/* 더보기 기능의 데이터 가져오기 */
router.get('/more/:pageIdx', (req, res) => {    
    const pageIdx = (+req.params.pageIdx - 1) * 5;    
    const postData = moreData.slice(pageIdx, pageIdx+5);
    res.json(postData);
});

module.exports = router;