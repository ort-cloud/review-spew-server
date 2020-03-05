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
    connection: process.env.TEST_DATABASE_URL,
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

describe(`GET /api/reviews/savedReview/:usr_svd_rev_id`, () => {
  beforeEach("seed the db", () => seedSpewTables(db));

  it(`responds with 200`, () => {
    const id = "1";
    return supertest(app)
      .get(`/api/reviews/savedReview/${id}`)
      .expect(200);
  });
});

describe(`DELETE /api/reviews/savedReview/:usr_svd_rev_id`, () => {
  beforeEach("seed the db", () => seedSpewTables(db));

  it(`responds with 204`, () => {
    const id = 2;

    return supertest(app)
      .delete(`/api/reviews/savedReview/${id}`)
      .expect(204);
  });
});

describe(`GET /api/reviews/savedReview/user/:users_id`, () => {
  beforeEach("seed the db", () => seedSpewTables(db));

  it(`responds with 200`, () => {
    const users_id = 1;
    return supertest(app)
      .get(`/api/reviews/savedReview/user/${users_id}`)
      .expect(200);
  });
});
