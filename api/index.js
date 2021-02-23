const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index',{title:'쇼핑하우 by kakaocommerce'});
});

module.exports=router;


