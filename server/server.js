const app = require("express")();
const port = 3000;
const resFile = require('./response.json');
const { best, event, carousel, box } = resFile;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, X-Requested-With");
  next();
});

app.get('/item', (req, res) => {
  const { query : { type, page, count } } = req;
  res.status(200);
  if(type === 'best') {
    res.json(best);
    return;
  }
  if(type === 'event') {
    res.json(event);
    return;
  }
  if(type === 'carousel') {
    res.json(carousel);
    return;
  }
  if(!page || !count) {
    res.json({error: 'page 또는 count 누락'});
    return;
  }
  if(page * count > box.list.length) {
    res.json({error: '잔여 상품 없음'});
    return;
  }
  res.json({
    prefix : box.prefix,
    list : box.list.slice(count * page - count, count * page)
  });
});

app.get('/length', (req, res) => {
  res.status(200);
  res.json({
    length : box.list.length
  });
  res.end();
});

app.listen(port, () => {
  console.log(`Server Loaded, http://localhost:${port}`);
});
