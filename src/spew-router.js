const express = require("express");
const SpewService = require("./spew-service");

const spewRouter = express.Router();

spewRouter
  .route("/:movie_title")
  /* .all(checkTitleExists) */
  .get((req, res, next) => {
    SpewService.getReviewsByTitle(
      req.app.get("db"), 
      req.params.movie_title
      )
      .then(search => {
        return res.json(search);
      })
      .catch(next);
  });

 /* async/await syntax for promises */
/* async function checkTitleExists(req, res, next) {
  try {
    const movieTitle = await SpewService.getReviewsByTitle(
      req.app.get("db"),
      req.params.movie_title
    );

    if (!movieTitle)
      return res.status(404).json({
        error: `Movie doesn't exist`,
      });

    res.movieTitle = movieTitle;
    next();
  } catch (error) {
    next(error);
  }
} */ 

module.exports = spewRouter;
