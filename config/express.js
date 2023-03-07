require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

module.exports = (app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
  app.use(morgan("dev"));
  return app;
};
