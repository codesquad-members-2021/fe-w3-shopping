const { log } = console;
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/foo', (req, res) => {
    res.sendFile(__dirname + "/data.json", (err) => {
        if (err) { res.sendStatus(400) }
        else { log('sending complete') }
    })
})

router.route('/bar').get((req, res) => {
    res.json(req.query);
}).post((req, res) => {
    const nameArr = ['id', 'name', 'address'],
        failed = nameArr.some(v => !req.body[v]);

    if (failed) { res.sendStatus(400) }
    else (res.send(`sending complete`))
})

module.exports = router;