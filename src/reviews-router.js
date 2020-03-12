const express = require("express");
const SpewService = require("./spew-service");

const spewReviewsRouter = express.Router();
const jsonParser = express.json();

spewReviewsRouter.route("/:reviews_id").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  const {reviews_id} = req.params;
  SpewService.getReviewsByReviewsId(knexInstance, reviews_id)
    .then(getSaved => {
      if (getSaved.length <= 0) {
        return res.status(404).json({
          error: {message: `Review doesn't exist`},
        });
      }
      res.status(200).json(getSaved);
    })
    .catch(next);
});

spewReviewsRouter
  .route("/savedReview/:id")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    const {id} = req.params;
    SpewService.getSavedReviewById(knexInstance, id)
      .then(getSaved => {
        if (getSaved.length <= 0) {
          return res.status(404).json({
            error: {message: `Review doesn't exist`},
          });
        }
        res.status(200).json(getSaved);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const {id} = req.params;
    SpewService.deleteSavedReview(knexInstance, id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

spewReviewsRouter.route("/savedReview").post(jsonParser, (req, res, next) => {
  const {users_id, reviews_id} = req.body;
  const savedReview = {reviews_id, users_id};

  SpewService.insertSavedReview(req.app.get("db"), savedReview)
    .then(review => {
      res.status(201).json(review);
    })
    .catch(next);
});

spewReviewsRouter
  .route("/savedReview/check/:users_id")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    const {users_id} = req.params;

    SpewService.getCheckIfUserSaved(knexInstance, users_id)
      .then(getSaved => {
        if (getSaved.length <= 0) {
          return res.json(false);
        }
        res.json(true);
      })
      .catch(next);
  });

spewReviewsRouter.route("/savedReview/user/:users_id").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  const {users_id} = req.params;

  SpewService.getSavedReviewUserId(knexInstance, users_id)
    .then(getSaved => {
      if (getSaved.length <= 0) {
        return res.status(404).json({
          error: {message: `Review doesn't exist.`},
        });
      }
      res.status(200).json(getSaved);
    })
    .catch(next);
});

module.exports = spewReviewsRouter;
