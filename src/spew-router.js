const express = require("express");
const SpewService = require("./spew-service");

const spewRouter = express.Router();
const jsonParser = express.json();

spewRouter.route("/:movie_title").get((req, res, next) => {
  SpewService.getReviewsByTitle(req.app.get("db"), req.params.movie_title)
    .then(movie => {
      if (movie.length <= 0) {
        return res.status(404).json({
          error: {message: `no no no`},
        });
      }
      return res.status(200).json(movie);
    })
    .catch(next);
});

spewRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    SpewService.getAllUsers(knexInstance)
      .then(users => {
        res.json(users);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {username, password} = req.body;
    const newUser = {password, username};

    for (const [key, value] of Object.entries(newUser)) {
      if (value == null) {
        return res.status(400).json({
          error: {message: `Missing '${key}' in request body`},
        });
      }
    }

    newUser.username = username;
    newUser.password = password;

    SpewService.insertUser(req.app.get("db"), newUser)
      .then(user => {
        res
        .status(201)
        .location(`/users/${user.id}`)
        .json(user);
      })
      .catch(next);
  });

module.exports = spewRouter;
