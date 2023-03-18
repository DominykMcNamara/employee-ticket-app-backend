require("dotenv").config();
const pg = require("pg");
const { assert } = require("chai");
const request = require("supertest");
const client = require("../db");
const UserModel = require("../models/users");
const userModelInstance = new UserModel();

describe("Creating a User", () => {
  // MOCK DB
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

  // CREATE
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

      //READ
      describe("Finding all users", () => {
        it("returns all users", async () => {
          const users = await userModelInstance.findAllUsers();
          assert.equal(users.length, 1);
        });
      });
      describe("Finding a user by id", () => {
        it("returns a single user based on their id", async () => {
          const user = await userModelInstance.findUserById(1);
          assert.equal(user.id, 1);
        });
      });
      describe("Finding a user by email", () => {
        it("returns a single user based on their email", async () => {
          const user = await userModelInstance.findUserByEmail("Dom@gmail.com");
          assert.equal(user.email, "Dom@gmail.com");
        });
      });
      describe("Finding a user by username", () => {
        it("returns a single user based on their username", async () => {
          const user = await userModelInstance.findUserByUsername("dMcNamara");
          assert.equal(user.username, "dMcNamara");
        });
      });

      //UPDATE
      describe("Updating an users' information", () => {
        it("Finds the correct user", async () => {
          const updatedUser = await userModelInstance.updateUser({
            id: 1,
            username: "Maple",
            password: "pwd",
            email: "Maple@email.com",
          });
          assert.equal(updatedUser.id, 1);
        });
        it("Updates and returns the correct user' username", async () => {
          const updatedUser = await userModelInstance.updateUser({
            id: 1,
            username: "Maple",
            password: "pwd",
            email: "Maple@email.com",
          });
          assert.equal(updatedUser.username, "Maple");
        });
        it("Updates, hashes, and returns the updated user' password", async () => {
          const updatedUser = await userModelInstance.updateUser({
            id: 1,
            username: "Maple",
            password: "pwd",
            email: "Maple@email.com",
          });
          assert.notEqual(updatedUser.password, "pwd");
        });
        it("Updates and returns the updated user' email", async () => {
          const updatedUser = await userModelInstance.updateUser({
            id: 1,
            username: "Maple",
            password: "pwd",
            email: "Maple@email.com",
          });
          assert.equal(updatedUser.email, "Maple@email.com");
        });
      });

      //DELETE
      describe("Delete a user", () => {
        it("Deletes a user by the users id", async () => {
          const deletedUser = await userModelInstance.deleteUserById({ id: 1 });
          assert.equal(deletedUser, null);
        });
      });
    });
  });
});
