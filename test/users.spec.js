/* require("dotenv").config();
const knex = require("knex");
const {expect} = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const {cleanTables} = require("./test-helpers");
const {seedSpewTables} = require("./test-helpers");

let db;

before("make knex instance", () => {
  db = knex({
    client: "pg",
    connection: process.env.TEST_DB_URL,
  });
  app.set("db", db);
});

before("cleanup", () => cleanTables(db));

afterEach("cleanup", () => cleanTables(db));

after(`Disconnect from db`, () => db.destroy());

describe(``, () => {
  context(``, () => {
    beforeEach("", () => seedSpewTables(db));

    it(`Gets reviews based on movie_title`, () => {
      const titleToSearch = "Test title 1";
      const expectedResponse = [
        {
          movie_title: "Test title 1",
          genre: "Test title 1",
          review_author: "Test author 1",
          review_url: "Test URL 1",
          review_text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
        },
      ];

      return supertest(app)
        .get(`/api/search/${titleToSearch}`)
        .expect(expectedResponse);
    });
  });
}); */