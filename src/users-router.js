const express = require("express");
const SpewService = require("./spew-service");

const spewUsersRouter = express.Router();
const jsonParser = express.json();

spewUsersRouter
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
