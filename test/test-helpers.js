function makeMoviesArray() {
  return [
    {
      movies_id: 1,
      movie_title: "Test title 1",
      genre: "Test title 1",
    },
    /*     {
      movies_id: 2,
      movie_title: 'Test title 2',
      genre: 'Test genre 2'
    },
    {
      movies_id: 3,
      movie_title: 'Test title 3',
      genre: 'Test genre 3'
    },
    {
      movies_id: 4,
      movie_title: 'Test title 4',
      genre: 'Test genre 4',
    }, */
  ];
}

function makeReviewsArray(makeMoviesArray) {
  return [
    {
      reviews_id: 1,
      movies_id: 1,
      review_author: "Test author 1",
      review_url: "Test URL 1",
      review_text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
    },
    /*     {
      reviews_id: 2,
      movies_id: 2,
      review_author: 'Test author 2',
      review_url:'Test URL 2',
      review_text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      reviews_id: 3,
      movies_id: 3,
      review_author: 'Test author 3',
      review_url:'Test URL 3',
      review_text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      reviews_id: 4,
      movies_id: 4,
      review_author: 'Test author 4',
      review_url:'Test URL 4',
      review_text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    }, */
  ];
}

function makeUsersArray() {
  return [
    {
      username: "userone",
      password: "password1",
    },
  ];
}

function makeUsrSvdRevArray() {
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
  // use a transaction to group the queries and auto rollback on any failure
  const testMovies = makeMoviesArray();
  const testReviews = makeReviewsArray(testMovies);
  const testUsers = makeUsersArray();
  const testSavedReview = makeUsrSvdRevArray();
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
  makeUsrSvdRevArray,
  seedSpewTables,
  cleanTables,
};
