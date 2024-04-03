require("dotenv").config({ path: "../.env" });
const mysql = require("mysql2/promise");

const { host, user, password, database } = process.env;
module.exports = () => {
  const connection = mysql.createPool({
    host,
    user,
    password,
    database,
  });
  return connection;
};
