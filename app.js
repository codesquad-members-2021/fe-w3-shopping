const express = require("express");
const server = express();

server.use(express.static(__dirname + "/public"))
server.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html");
});

server.listen(3000, (err) => {
   if (err) return console.log("err");
   console.log("the server is listening on port 3000");
});


//?Express환경구축
//npm install express
//npm init -y
//npm install nodemon
//npm run dev
//npm install express-handlebars

//?sass환경구축
//parcel build index.html