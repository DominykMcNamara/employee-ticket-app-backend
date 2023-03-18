const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });
const bcrypt = require("bcrypt");
module.exports = class UsersModel {
  constructor(data = {}) {
    (this.email = data.email),
      (this.username = data.username),
      (this.password = data.password),
      (this.first_name = data.firstName),
      (this.last_name = data.lastName);
  }

  // CREATE
  async create(data) {
    try {
      const command = pgp.helpers.insert(data, null, "users") + "RETURNING *";
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  // READ
  async findAllUsers() {
    try {
      const command =
        'SELECT id, created_at, modified_at, first_name, last_name, email, username FROM "users"';
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUserById(id) {
    try {
      const command =
        'SELECT id, created_at, modified_at, first_name, last_name, email, username FROM "users" WHERE id = $1';
      const values = [id];
      const results = await db.query(command, values);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserByEmail(email) {
    try {
      const command =
        'SELECT id, created_at, modified_at, first_name, last_name, email, username FROM "users" WHERE email = $1';
      const values = [email];
      const results = await db.query(command, values);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserByUsername(username) {
    try {
      const command =
        'SELECT id, created_at, modified_at, first_name, last_name, email, username FROM "users" WHERE username = $1';
      const values = [username];
      const results = await db.query(command, values);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  // UPDATE
  async updateUser(data) {
    const { id, ...params } = data;
    const updatedUser = {
      username: params.username,
      password: await bcrypt.hash(params.password, 10),
      email: params.email
    };
    try {
      const findUser = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const command = pgp.helpers.update(updatedUser, null, "users") + findUser;
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  // DELETE
  async deleteUserById(id) {
    try {
      const command = "DELETE FROM users WHERE id = $1"
      const value = [id]
      const results = db.query(command, value)
      if(results.rows?.length) {
        return results.rows[0]
      }
      return null
    } catch (err) {
      throw new Error(err)
    }
  }
};
