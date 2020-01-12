require('dotenv').config()
const knex = require("knex");
const {expect} = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");
const SpewService = require("../src/spew-service");

describe("Spew Endpoints", function() {
  let db;

  const {testMovies, testReviews} = helpers.makeSpewFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`GET /api/search/:movie_title`, () => {
    context(`Given no movie titles`, () => {
      it(`responds with 200 and an empty list`, () => {
        const movie_title = helpers.makeMoviesArray()[1];
        return supertest(app)
          .get(`/api/search/${movie_title}`)
          .expect(200, []);
      });
    });

    context("Given there are movie titles in the database", () => {
      beforeEach("insert movies", () =>
        helpers.seedSpewTables(db, testMovies, testReviews)
      );

      it("responds with 200 and all of the reviews by title", () => {
        const movie_title = helpers.makeMoviesArray()[1];
        const expectedResponse = testMovies.map(reviews =>
          helpers.makeExpectedResponse(testMovies, reviews)
        );
        return supertest(app)
          .get(`/api/search/${movie_title}`)
          .expect(200, expectedResponse);
      });
    });
  });
});
