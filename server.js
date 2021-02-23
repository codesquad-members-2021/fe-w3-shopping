import express from "express";
import path from "path";
//express.route
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, "public");


app.use(express.static(PUBLIC_DIR));

app.get("/", (req, res) => {
  const indexHTML = path.join(PUBLIC_DIR, "index.html");
  res.sendFile(indexHTML);
});

app.get("/server_img/banner/:bannerId", (req, res) => {
  const bannerId = req.params.bannerId;
  const filePath = path.join(PUBLIC_DIR, `/server_img/banner/${bannerId}.png`);
  res.sendFile(filePath);
  // res.send(`<img src='/server_img/banner/${bannerId}.png' alt="none">`);
});

app.get("/server_img/hotItem/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  res.send(`<img src='/server_img/banner/${itemId}.png'>`);
});

app.listen(PORT, () => {
  console.log("server is running!!!");
});
