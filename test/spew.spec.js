require("dotenv").config();
const knex = require("knex");
const {expect} = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const {makeMoviesArray} = require('./test-helpers')
const {makeReviewsArray} = require('./test-helpers') 

let db;

before(() => {
  db = knex ({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
  })
})

before(() => {
  return db.raw('TRUNCATE TABLE movies, reviews, users, usr_svd_rev RESTART IDENTITY CASCADE')
});

afterEach(() => {
  return db.raw('TRUNCATE TABLE movies, reviews, users, usr_svd_rev RESTART IDENTITY CASCADE')
});

after(`Disconnect from db`, () =>db.destroy());

describe(`GET /api/search/:movie_title`, ()=> {

})