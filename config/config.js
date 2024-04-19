require("dotenv").config();

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

module.exports = {
  development: {
    username: "root",
    password: "bismillah",
    database: "zawata_attendance",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
};
