const SpewService = {
  getMovieById(knex, id) {
    return knex
      .from("movies")
      .where("movies_id", id)
      .first();
  },

  getReviewsById(knex, id) {
    return knex
      .from("reviews")
      .where("reviews_id", id)
      .first();
  },
};

module.exports = SpewService;
