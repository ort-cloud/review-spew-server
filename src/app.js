require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const {NODE_ENV} = require("./config");
const winston = require("winston");
const spewRouter = require("./spew-router");
const spewUsersRouter = require("./users-router");
const spewReviewsRouter = require("./reviews-router");
const SpewService = require("./spew-service");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({filename: "info.log"})],
});

if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

app.use("/api/search", spewRouter);
app.use("/api/users", spewUsersRouter);
app.use("/api/reviews", spewReviewsRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = {error: {message: "server error"}};
  } else {
    console.error(error);
    response = {message: error.message, error};
  }
  res.status(500).json(response);
});

module.exports = app;
