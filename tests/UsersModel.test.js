require("dotenv").config();
const pg = require("pg");
const { assert } = require("chai");
const request = require("supertest");
const client = require("../db");
const UserModel = require("../models/users");
const userModelInstance = new UserModel();

describe("Creating a User", () => {
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
    beforeEach("Create temporary tables", async () => {
      await client.query(
        `CREATE TEMPORARY TABLE "users" (LIKE "users" INCLUDING ALL)`
      );
    });
    beforeEach("Create temporary data", async () => {
      await userModelInstance.create({
        email: "Dom@gmail.com",
        username: "dMcNamara",
        password: "password",
        first_name: "Dom",
        last_name: "McNamara",
      });
    });
    afterEach("Drop temporary tables", async () => {
      await client.query("DROP TABLE IF EXISTS pg_temp.users");
    });
  });

  describe("#id", () => {
    it("is a string", async () => {
      const user = await userModelInstance.create({
        email: "Mackenzie@gmail.com",
        username: "mMcNamara",
        password: "password",
        first_name: "Mackenzie",
        last_name: "McNamara",
      });
      assert.strictEqual(user.id, 2);
    });
  });
  describe("#email", () => {
    it("is a string", async () => {
      const user = await userModelInstance.create({
        email: "Mackenzie@gmail.com",
        username: "mMcNamara",
        password: "password",
        first_name: "Mackenzie",
        last_name: "McNamara",
      });
      assert.strictEqual(user.email, "Mackenzie@gmail.com");
    });
    describe("#username", () => {
      it("is a string", async () => {
        const user = await userModelInstance.create({
          email: "Mackenzie@gmail.com",
          username: "mMcNamara",
          password: "password",
          first_name: "Mackenzie",
          last_name: "McNamara",
        });
        assert.strictEqual(user.username, "mMcNamara");
      });
      describe("#password", () => {
        it("is a string", async () => {
          const user = await userModelInstance.create({
            email: "Mackenzie@gmail.com",
            username: "mMcNamara",
            password: "password",
            first_name: "Mackenzie",
            last_name: "McNamara",
          });
          assert.strictEqual(user.password, "password");
        });
      });
      describe("#first_name", () => {
        it("is a string", async () => {
          const user = await userModelInstance.create({
            email: "Mackenzie@gmail.com",
            username: "mMcNamara",
            password: "password",
            first_name: "Mackenzie",
            last_name: "McNamara",
          });
          assert.strictEqual(user.first_name, "Mackenzie");
        });
      });
      describe("#last_name", () => {
        it("is a string", async () => {
          const user = await userModelInstance.create({
            email: "Mackenzie@gmail.com",
            username: "mMcNamara",
            password: "password",
            first_name: "Mackenzie",
            last_name: "McNamara",
          });
          assert.strictEqual(user.last_name, "McNamara");
        });
      });
    });
  });
});
