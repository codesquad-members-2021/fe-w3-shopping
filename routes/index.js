var express = require('express');
var app = express();
var router = express.Router();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/form', function(req, res ) {
  res.render('form.html');
});


router.post('/post_email', function(req,res){
  res.send("<h1> welcome " + req.body.email + "</h1>")
})
module.exports = router;
