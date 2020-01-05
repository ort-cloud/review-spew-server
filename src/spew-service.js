const SpewService = {
  getMovieById(knex, id) {
    return knex
      .from("movies")
      .select("*")
      .where("movies_id", id)
      .first();
  },

  getReviewsById(knex, id) {
    return knex
      .from("reviews")
      .select("*")
      .where("reviews_id", id)
      .first();
  },

  getWhateverDataIcan(knex, movie_title) {
    return knex
      .from("movies")
      .innerJoin("reviews", "movies.movies_id", "reviews.movies_id")
      .select("*")
      .where("movie_title", movie_title);
  },
};

module.exports = SpewService;
