import express from "express";
import path from "path";

const __dirname = path.resolve()
const app = express();
const PORT = process.env.PORT || 8080;
const ROOT_DIR = path.join(__dirname, "src");

app.get("/", (req, res) => {
  const indexHTML = path.join(ROOT_DIR, "index.html");
  res.sendFile(indexHTML);
});

app.listen(PORT, () => {
  console.log("server is running!");
});
