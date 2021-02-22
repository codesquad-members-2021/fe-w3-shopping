import express from "express";
import path from "path";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8080;
const SRC_DIR = path.join(__dirname, "src");
const IMG_DIR = path.join(__dirname, "server_img");
app.use(express.static(IMG_DIR));

app.get("/", (req, res) => {
  const indexHTML = path.join(SRC_DIR, "index.html");
  res.sendFile(indexHTML);
});
app.get("/banner/:id", (req, res) => {
  const id = req.params.id;
  res.send(`TEST, <img src='/banner/${id}.png'>`);
});

app.listen(PORT, () => {
  console.log("server is running!");
});
