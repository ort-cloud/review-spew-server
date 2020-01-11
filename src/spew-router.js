const express = require("express");
const SpewService = require("./spew-service");

const spewRouter = express.Router();

spewRouter
  .route("/:movie_title")
  .all(checkTitleExists)
  .get((req, res, next) => {
    SpewService.getReviewsByTitle(req.app.get("db"), req.params.movie_title)
      .then(search => {
        return res.json(search);
      })
      .catch(next);
  });

/* async/await syntax for promises */
async function checkTitleExists(req, res, next) {
  try {
    const movie_title = await SpewService.getReviewsByTitle(
      req.app.get("db"),
      req.params.movie_title
    );

    if (!movie_title)
      return res.status(404).json({
        error: `Movie doesn't exist`,
      });

    res.movie_title = movie_title;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = spewRouter;
