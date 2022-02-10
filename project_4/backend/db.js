const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "example",
  port: 5432,
  database: "project4",
});

module.exports = pool;
