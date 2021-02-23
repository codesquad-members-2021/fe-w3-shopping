const app = require("express")();
const port = 3000;
const resFile = require('./response.json');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, X-Requested-With");
  next();
 });

app.get('/', (req, res) => {
  console.log('get, /');
  res.json({abc:'abc'});
})

app.listen(port, () => {
  console.log(`Server Loaded, http://localhost:${port}`);
});
