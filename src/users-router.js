const express = require("express");
const SpewService = require("./spew-service");

const spewUsersRouter = express.Router();
const jsonParser = express.json();

spewUsersRouter
  .route("/")
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
  })
  .patch(jsonParser, (req, res, next)=>{
    const {username, password} = req.body;
    const userToUpdate = {password, username};

    console.log(req.params);
    SpewService.updateUser(req.app.get("db"), req.params.users_id, userToUpdate)
    .then(numRowsAffected => {
      res.status(204).end();
    })
    .catch(next);
  })

module.exports = spewUsersRouter;
