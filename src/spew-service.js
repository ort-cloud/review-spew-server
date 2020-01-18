const SpewService = {
  getMovieById(db, id) {
    return db
      .from("movies")
      .select("*")
      .where("movies_id", id)
      .first();
  },

  getReviewsById(db, id) {
    return db
      .from("reviews")
      .select("*")
      .where("reviews_id", id)
      .first();
  },

  getUsersById(db, id) {
    return db
      .from("users")
      .select("*")
      .where("users_id", id)
      .first();
  },

  getAllUsers(knex) {
    return knex.select("*").from("users");
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
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

  //TODO: Psuedo code. No logic behind it.
  insertSavedReview(db) {
    return db
      .insert(savedReview)
      .into("usr_svd_rev")
      .then(rows => {
        return rows[0];
      });
  },
};

module.exports = SpewService;
