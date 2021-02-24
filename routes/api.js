const moreData = require('../data/more.js');

const express = require('express');
const router = express.Router();

/* 더보기 기능의 데이터 가져오기 */
router.get('/more/:pageIdx', (req, res) => {    
    try {
        const pageIdx = (+req.params.pageIdx - 1);  
        const postData = moreData.slice(pageIdx, pageIdx+1);        
        if (!postData || postData.length <= 0) 
            throw new Error('[!!] 더보기 데이터가 존재하지 않습니다.');

        res.status(200).json(postData);
    } catch (err) {
        res.status(404).json({err})
    }
});

module.exports = router;