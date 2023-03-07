require("dotenv").config;
const express = require("express");
const app = express();
const config = require("./config/index");
const PORT = process.env.PORT || 3500;

const startServer = async () => {
  config(app);

  app.listen(PORT, () => console.log(`Server running on ${PORT}.`));
};
startServer();
