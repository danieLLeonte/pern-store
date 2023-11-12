const { Pool } = require("pg");

const pool = new Pool({
  user: "me",
  password: "password",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "api",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
