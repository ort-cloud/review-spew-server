const knex = require("knex");
const {expect} = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");
const SpewService = require('../src/spew-service')

/* describe(`Spew service object`, function() {
  it(`should run the tests`, () => {
    expect(true).to.eql(false)
  })
}) */

describe("Spew Endpoints", function() {
  let db;

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

});
