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

describe(`POST /api/users/`, () => {
  beforeEach("seed the db", () => seedSpewTables(db));

  const createTestUser = {
    username: "testUser",
    password: "testpassword",
  };

  it(`responds with 201`, () => {
    return supertest(app)
      .post(`/api/users/`)
      .send(createTestUser)
      .expect(201);
  });
});
