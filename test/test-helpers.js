function makeMoviesArray() {
  return [
    {
      movies_id: 1,
      movie_title: 'Test title 1',
      genre: 'Test genre 1'
    },
    {
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
    },
  ];
}

function makeReviewsArray(movies) {
  return [
    {
      reviews_id: 1,
      movies_id: movies[0].id,
      users_id: null,
      review_author: 'Test author 1',
      review_url:'Test URL 1',
      review_text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      reviews_id: 2,
      movies_id: movies[1].id,
      users_id: null,
      review_author: 'Test author 2',
      review_url:'Test URL 2',
      review_text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      reviews_id: 3,
      movies_id: movies[2].id,
      users_id: null,
      review_author: 'Test author 3',
      review_url:'Test URL 3',
      review_text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      reviews_id: 4,
      movies_id: movies[3].id,
      users_id: null,
      review_author: 'Test author 4',
      review_url:'Test URL 4',
      review_text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ];
}

function makeExpectedResponse(movies, reviews = []) {
  return {
    movie_title: movies.movie_title,
    genre: movies.genre,
    review_author: reviews.review_author,
    review_url: reviews.review_url,
    review_text: reviews.review_text,
  }
}

function makeSpewFixtures() {
  const testMovies = makeMoviesArray();
  const testReviews = makeReviewsArray(testMovies);
  return {testMovies, testReviews};
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx
      .raw(
        `TRUNCATE
        reviews,
        movies
        RESTART IDENTITY CASCADE`
      )
      /* .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE reviews_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE movies_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('reviews_id_seq', 0)`),
          trx.raw(`SELECT setval('movies_id_seq', 0)`),
        ])
      ) */
  );
}

function seedSpewTables(db, movies, reviews = []) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await trx.into("movies").insert(movies);
    await trx.into("reviews").insert(reviews);
    // update the auto sequence to match the forced id values
    /* await Promise.all([
      trx.raw(`SELECT setval('movies_id_seq', ?)`, [
        movies[movies.length - 1].id,
      ]),
      trx.raw(`SELECT setval('reviews_id_seq', ?)`, [
        reviews[reviews.length - 1].id,
      ]),
    ]); */
  });
}

module.exports = {
  makeMoviesArray,
  makeReviewsArray,
  makeExpectedResponse,
  makeSpewFixtures,
  seedSpewTables,
  cleanTables,
}