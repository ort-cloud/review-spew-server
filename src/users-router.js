const express = require("express");
const SpewService = require("./spew-service");

const spewUsersRouter = express.Router();
const jsonParser = express.json();

spewUsersRouter.route("/").post(jsonParser, (req, res, next) => {
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

//TODO: Refactor! Creating getUserAndReviewId service to get both user and review id's. Logic above post will be removed.
//left logic in for reference
spewUsersRouter
  .route("/saved")
  .all((req, res, next) => {
    const knexInstance = req.app.get("db");
    SpewService.getUsersById(knexInstance, req.params.users_id)
      .then(users => {
        if (users.length <= 0) {
          return res.status(404).json({
            error: {message: `User doesn't exist`},
          });
        }
        res.json(users);
      })
      .catch(next);
  })
  .all((req, res, next) => {
    const knexInstance = req.app.get("db");
    SpewService.getReviewsById(knexInstance, req.params.reviews_id)
      .then(reviews => {
        res.json(reviews);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {users_id, reviews_id} = req.body;
    const saveReview = {users_id, reviews_id};

    saveReview.users_id = user;
    saveReview.reviews_id = review;

    SpewService.insertSavedReview(knexInstance, savedReview)
      .then(saved => {
        res
        .status(201)
        .location(`/saved/${saved.id}`)
        .json(saved);
      })
      .catch(next);
  });

spewUsersRouter.route("/:users_id").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  SpewService.getUsersById(knexInstance, req.params.users_id)
    .then(users => {
      if (users.length <= 0) {
        return res.status(404).json({
          error: {message: `User doesn't exist`},
        });
      }
      res.json(users);
    })
    .catch(next);
});

module.exports = spewUsersRouter;
