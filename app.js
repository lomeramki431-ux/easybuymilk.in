const fs = require("fs");
const https = require("https");
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

const routes = require("./routes/router");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api", routes);

// SSL files
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem")),
};

const HTTPS_PORT = process.env.PORT || 3000;
const HTTP_PORT = 80;

// HTTPS Server
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`🔐 HTTPS Server running at https://localhost:${HTTPS_PORT}`);
});

// HTTP → HTTPS Redirect
http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
  })
  .listen(HTTP_PORT, () => {
    console.log("➡️ HTTP redirected to HTTPS");
  });
