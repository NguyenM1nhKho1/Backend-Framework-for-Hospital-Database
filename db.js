const mysql = require("mysql2");

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Cunhenhe1975",
  database: "hospitaldb",
});

module.exports = database;
