const express = require("express");
const SpewService = require("./spew-service");

const spewReviewsRouter = express.Router();
const jsonParser = express.json();

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
  .route("/savedReview/:usr_svd_rev_id")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    const {usr_svd_rev_id} = req.params;
    SpewService.getSavedReviewById(knexInstance, usr_svd_rev_id)
      .then(getSaved => {
        if (getSaved.length <= 0) {
          return res.status(404).json({
            error: {message: `Review doesn't exist`},
          });
        }
        res.json(getSaved);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const {usr_svd_rev_id} = req.params;
    SpewService.deleteSavedReview(knexInstance, usr_svd_rev_id)
      .then(numRowsAffected => {
        res
          .status(204)
          .send("Delete Complete!")
          .end();
      })
      .catch(next);
  });

spewReviewsRouter.route("/savedReview/user/:users_id").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  const {users_id} = req.params;
  SpewService.getSavedReviewByUserId(knexInstance, users_id)
    .then(getSaved => {
      if (getSaved.length <= 0) {
        return res.status(404).json({
          error: {message: `User-review doesn't exist`},
        });
      }
      res.json(getSaved);
    })
    .catch(next);
});

module.exports = spewReviewsRouter;
