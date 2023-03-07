require("dotenv").config();
const pg = require("pg");

const dbConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
};

const pool = new pg.Pool(dbConfig);
pool.on("error", (err) => console.log(err));

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};