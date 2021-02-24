const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: '쇼핑하우 by kakaocommerce' });
});

module.exports = router;
