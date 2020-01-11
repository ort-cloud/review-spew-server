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
};

module.exports = SpewService;
