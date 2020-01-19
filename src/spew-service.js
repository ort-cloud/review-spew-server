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
      .where("users_id", id);
  },

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

  //TODO: Not sure if what I actually need. Ask Mentor.
  getUserAndReviewId(db){
    return db
    .from('users')
    .innerJoin('reviews', 'users.users_id','reviews.reviews_id')
    .select('users.users_id','reviews.reviews_id')
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

  //TODO: Not sure if what I actually need. Ask Mentor.
  insertSavedReview(db, saveReview) {
    return db
      .insert(saveReview)
      .into("usr_svd_rev")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },

  //TODO: 
  updateUser(db, id) {
    return db
      .from("users")
      .where({id})
      .update();
  },

  deleteUser(db, users_id) {
    return db
      .from("users")
      .where({users_id})
      .delete();
  },
};

module.exports = SpewService;
