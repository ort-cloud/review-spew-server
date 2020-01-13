require("dotenv").config();
const knex = require("knex");
const {expect} = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`GET /api/search/:movie_title`, function() {
  let db;

  const movie_title = helpers.makeMoviesArray()[1];

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

  context(`Given no movie titles`, () => {
    it(`responds with 200 and an empty list`, () => {
      return supertest(app)
        .get(`/api/search/${movie_title}`)
        .expect(200, []);
    });
  });

  context("Given there are movie titles in the database", () => {
    beforeEach(() => {
      return db
        .into()
    });

    it("responds with 200 and all of the reviews by title", () => {
      return supertest(app)
        .get(`/api/search/${movie_title}`)
        .expect(200);
    });
  });
});