require("dotenv").config();
const pg = require("pg");
const { expect } = require("chai");
const request = require("supertest");
const client = require("../db");

describe("Database initialization", () => {
  let app;
  const dbConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    max: 1,
    idleTimeoutMillis: 0,
  };
  const pool = new pg.Pool(dbConfig);
  client.query = (text, values) => {
    return pool.query(text, values);
  };
});
