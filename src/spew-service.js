const SpewService = {
  //! Not sure if I actually need.
  getMovieById(db, id) {
    return db
      .from("movies")
      .select("*")
      .where("movies_id", id)
      .first();
  },

  //! Not sure if I actually need.
  getReviewsById(db, id) {
    return db
      .from("reviews")
      .select("*")
      .where("reviews_id", id)
      .first();
  },

  //! Not sure if I actually need.
  getUsersById(db, id) {
    return db
      .from("users")
      .select("*")
      .where("users_id", id);
  },

  //! Not sure if I actually need.
  getAllUsers(knex) {
    return knex.select("*").from("users");
  },

  getReviewsByTitle(db, movie_title) {
    return db
      .from("movies")
      .innerJoin("reviews", "movies.movies_id", "reviews.movies_id")
      .select(
        "movies.movie_title",
        "movies.genre",
        "reviews.review_author",
        "reviews.review_url",
        "reviews.review_text"
      )
      .where("movie_title", movie_title);
  },

  //! Not sure if I actually need.
  getUserAndReviewId(db) {
    return db
      .from("users")
      .innerJoin("reviews", "users.users_id", "reviews.reviews_id")
      .select("users.users_id", "reviews.reviews_id");
  },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("users")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },

  insertSavedReview(db, savedReview) {
    return db
      .insert(savedReview)
      .into("usr_svd_rev")
      .then(saved => {
        return "saved";
      });
  },

  //TODO:
  updateUser(db, users_id) {
    return db
      .from("users")
      .where({users_id})
      .update();
  },

  deleteUser(db, users_id) {
    return db
      .from("users")
      .where({users_id})
      .delete();
  },

  deleteSavedReview(db, id) {
    return db
      .from("usr_svd_rev")
      .where({id})
      .delete()
      .then(response => {
        return "Delete Complete!";
      });
  },
};

module.exports = SpewService;
