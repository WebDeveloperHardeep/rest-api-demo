const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "rest_api_db",
});

connection.connect((err) => {
  if (err) {
    console.log("cannot connect to database");
    throw err;
  }

  console.log("Connected to the database");
});

module.exports = connection;
