const express = require("express");
const SpewService = require("./spew-service");

const spewRouter = express.Router();

spewRouter
  .route("/:movie_title")
  .get((req, res, next) => {
    SpewService.getReviewsByTitle(req.app.get("db"), req.params.movie_title)
      .then(movie => {
        if (!movie) {
          return res.status(404).json({
            error: {message: `no no no`},
          });
        }
        return res.json(movie);
      })
      .catch(next);
  });

module.exports = spewRouter;
