const moreData = require('../data/more.js');

const express = require('express');
const router = express.Router();

/* 더보기 기능의 데이터 가져오기 */
router.get('/more', (req, res) => {
    // 한 page당 5개의 데이터 GET
    const page = (+req.query.page - 1) * 5;    
    const postData = moreData.slice(page, page+5);

    res.send(postData);    
});

module.exports = router;