const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
const fs = require("fs");
path = require('path'),    
filePath = path.join(__dirname, 'test.txt');

router.get("/", (req, res) => {
  let unitId = (req.query || {})["unitId"];
  fs.writeFileSync("test.txt", "unitId=" + unitId);
  res.json({
    hello: "hi!",
  });
});

router.get("/data", (req, res) => {
  fs.readFile('test.txt', { encoding: "utf-8" }, function (err, data) {
    if (!err) {
      console.log("received data: " + data);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    } else {
      console.log(err);
    }
  });
});
router.get("/test", (req, res) => {
  res.json({
    hello: "test",
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
