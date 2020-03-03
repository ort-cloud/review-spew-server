require("dotenv").config();
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

describe(`POST /api/reviews/savedReview`, () => {
  beforeEach("seed the db", () => seedSpewTables(db));

  const testPost = {
    users_id: 1,
    reviews_id: 1,
  };

  it(`responds with 201`, () => {
    return supertest(app)
      .post(`/api/reviews/savedReview`)
      .send(testPost)
      .expect(201);
  });
});