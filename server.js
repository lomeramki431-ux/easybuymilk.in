const fs = require("fs");
const path = require("path");
const express = require("express");
const https = require("https");
const http = require("http");

const app = express();

// Your normal Express middlewares
app.use(express.json());
app.get("/", (req, res) => {
  res.send("HTTPS Working! 🔐");
  
});

// -------- SSL FILES -------- //
const sslPath = path.join(__dirname, "ssl");

const options = {
  key: fs.readFileSync(path.join(sslPath, "private.key")),
  cert: fs.readFileSync(path.join(sslPath, "certificate.crt")),
};

// -------- Create HTTPS SERVER -------- //
const HTTPS_PORT = 443;
https.createServer(options, app).listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server Running at https://localhost`);
});

// -------- Redirect HTTP → HTTPS -------- //
const HTTP_PORT = 80;
http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
  })
  .listen(HTTP_PORT, () => {
    console.log("HTTP redirected to HTTPS");
  });
