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

spewUsersRouter.route("/login").post(jsonParser, (req, res, next) => {
  const {username, password} = req.body;
  const loginUser = {username, password};

  for (const [key, value] of Object.entries(loginUser)) {
    if (value == null) {
      return res.status(400).json({
        error: {message: `Missing '${key}' in request body`},
      });
    }
  }
  SpewService.getUserByUsername(req.app.get("db"), loginUser.username)
    .then(dbUser => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect username or password",
        });
      return SpewService.comparePasswords(
        req.app.get("db"),
        loginUser.password
      ).then(password => {
        if (!password) {
          return res.status(400).json({
            error: `Incorrect username or password`,
          });
        }
        const sub = dbUser.username;
        const payload = dbUser.id;
        return (
          res.send({
            id: payload,
            username: sub,
          }),
          res.json()
        );
      });
    })
    .catch(next);
});

spewUsersRouter
  .route("/:users_id")
  .get((req, res, next) => {
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
  .delete((req, res, next) => {
    const {users_id} = req.params;
    SpewService.deleteUser(req.app.get("db"), users_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

spewUsersRouter.route("/username/:username").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  const {username} = req.params;
  SpewService.getUserByUsername(knexInstance, username)
    .then(data => {
      if (data.length <= 0) {
        return res.status(404).json({
          error: {message: `User doesn't exist`},
        });
      }
      res.json(data);
    })
    .catch(next);
});

module.exports = spewUsersRouter;
