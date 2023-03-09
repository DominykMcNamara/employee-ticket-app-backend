const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class UsersModel {
  constructor(data = {}) {
    (this.email = data.email),
      (this.username = data.username),
      (this.password = data.password),
      (this.first_name = data.firstName),
      (this.last_name = data.lastName);
  }

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
};
