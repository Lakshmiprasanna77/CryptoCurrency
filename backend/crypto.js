const express = require("express");
const stocks = express.Router();
const bodyParser = require("body-parser");
stocks.use(bodyParser.json());
stocks.get("/", (req, res, next) => {
  console.log("hello world");
});
