const express = require("express");
const router = express.Router();
const jsonData = require('../response.json');
const { best, event, carousel, box } = jsonData; //spread operator 

router.get("/", (req, res, next) => {
    // console.log("req.query", req.query); => { section: 'best' }
    // req.query.section => [ 'best', 'event', 'box', 'carousel' ]
    const key = req.query.section;
    sendRequestedData(res, key);
});

function sendRequestedData(res, key){
    switch(key) {
        case "best":
            res.send(best);
            break;
        case "event":
            res.send(event);
            break;
        case "carousel":
            res.send(carousel);
            break;
        case "box":
            res.send(box);
            break;
    }
}

module.exports = router;