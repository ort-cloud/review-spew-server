function makeMoviesArray() {
  return [
    {
      movies_id: 1,
      movie_title: "Test title 1",
      genre: "Test title 1",
    },
  ];
}

function makeReviewsArray(makeMoviesArray) {
  return [
    {
      movies_id: 1,
      review_author: "Test author 1",
      review_url: "Test URL 1",
      review_text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
    },
  ];
}

function makeUsersArray() {
  return [
    {
      username: "userone",
      password: "password1",
    },
    {
      username: "usertwo",
      password: "password2",
    },
  ];
}

function makeUsrSvdRev() {
  return [
    {
      users_id: 1,
      reviews_id: 1,
    },
  ];
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        reviews,
        movies,
        users,
        usr_svd_rev
        RESTART IDENTITY CASCADE`
    )
  );
}

function seedSpewTables(db) {
  const testMovies = makeMoviesArray();
  const testReviews = makeReviewsArray(testMovies);
  const testUsers = makeUsersArray();
  const testSavedReview = makeUsrSvdRev();
  return db.transaction(async trx => {
    await trx.into("movies").insert(testMovies);
    await trx.into("reviews").insert(testReviews);
    await trx.into("users").insert(testUsers);
    await trx.into("usr_svd_rev").insert(testSavedReview);
  });
}

module.exports = {
  makeMoviesArray,
  makeReviewsArray,
  makeUsersArray,
  makeUsrSvdRev,
  seedSpewTables,
  cleanTables,
};
