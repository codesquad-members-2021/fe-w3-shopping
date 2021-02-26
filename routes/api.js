const moreData = require('../data/more.js');
const planningData = require('../data/planningData.json').mallEventList;
// https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json

const express = require('express');
const router = express.Router();


/* 더보기 데이터 정보 전부 가져오기 */
router.get('/moreData', (req, res) => {    
    try {
        res.status(200).json({moreData, length: moreData.length});
    } catch (err) {
        res.status(500).json({err})
    }
});

/* 더보기 기능의 데이터 가져오기 */
router.get('/moreData/:pageIdx', (req, res) => {    
    try {
        const pageIdx = ((req.params.pageIdx-1) * 5);  
        const postData = moreData.slice(pageIdx, pageIdx+5);        
        
        if (!postData || postData.length <= 0) 
            throw new Error('[!!] 더보기 데이터가 존재하지 않습니다.');

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json({err})
    }
});

/* 하단 캐러셀 데이터 가져오기 */
router.get('/planning', (req, res) => {    
    try {
        const postData = planningData.slice(0, 10);
        
        if (!postData || postData.length <= 0) 
            throw new Error('[!!] 하단 캐러셀 데이터가 존재하지 않습니다.');

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json({err})
    }
});


module.exports = router;