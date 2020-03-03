require("dotenv").config();
const {expect} = require("chai");
const supertest = require("supertest");

process.env.NODE_ENV = "test";

process.env.TEST_DB_URL =
  process.env.TEST_DB_URL ||
  "postgresql://ort_cloud:order66@localhost/review-spew-test";

global.expect = expect;
global.supertest = supertest;
