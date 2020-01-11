require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const {NODE_ENV} = require("./config");
const winston = require("winston");
const SpewService = require("./spew-service");

const app = express();

const morganOption = NODE_ENV === "production";

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

app.get("/movies/:movies_id", (req, res, next) => {
  const knexInstance = req.app.get("db");
  SpewService.getMovieById(knexInstance, req.params.movies_id)
    .then(movies => {
      res.json(movies);
    })
    .catch(next);
});

app.get("/reviews/:reviews_id", (req, res, next) => {
  const knexInstance = req.app.get("db");
  SpewService.getReviewsById(knexInstance, req.params.reviews_id)
    .then(reviews => {
      res.json(reviews);
    })
    .catch(next);
});

app.get("/search/:movie_title", (req, res, next) => {
  const knexInstance = req.app.get("db");
  SpewService.getReviewsByTitle(knexInstance, req.params.movie_title)
    .then(search => {
      return res.json(search);
    })
    .catch(next);
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
