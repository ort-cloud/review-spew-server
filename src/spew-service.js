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

  getUserByUsername(db, username) {
    return db
    .from('users')
    .where({username})
    .first()
  },

  comparePasswords(knex, password) {
    return knex
    .from('users')
    .where({password})
    .first()
},

  getAllUsers(knex) {
    return knex.select("*").from("users");
  },

  getSavedReviewById(db, id) {
    return db
      .from("usr_svd_rev")
      .select("*")
      .where("id", id);
  },

  getSavedReviewByUserId(db, users_id) {
    return db
      .from("usr_svd_rev")
      .select("*")
      .where("users_id", users_id);
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

  updateUser(db, users_id, userToUpdate) {
    return db
      .from("users")
      .where({users_id})
      .update(userToUpdate);
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
