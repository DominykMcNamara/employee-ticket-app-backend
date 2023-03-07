require("dotenv").config();
const pg = require("pg");
const { expect } = require("chai");
const request = require("supertest");
const client = require("../db");

describe("Database initialization", () => {
  let app;
  before("Mock db connection", async () => {
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
    app = require("../server");
    beforeEach("Create temporary tables", async () => {
      await client.query(
        `CREATE TEMPORARY TABLE "Users" (LIKE "Users" INCLUDING ALL)`
      );
    });
    afterEach("Drop temporary tables", async () => {
      await client.query("DROP TABLE IF EXISTS pg_temp.Users");
    });
  });
});
