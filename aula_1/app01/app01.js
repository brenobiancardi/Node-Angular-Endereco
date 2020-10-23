// console.log("Ola");

const http = require("http");

http
  .createServer(function (req, res) {
    res.writeHeader(200, {
      "Content-Type": "text/plain",
    });
    res.end("Olá mundo!");
  })
  .listen(8080);
