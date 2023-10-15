const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database"); // include custom common js module

const app = express(); // initiate express app

app.use(bodyParser.json()); // use bodyparser as middleware to hadle body of request.

// custom middleware, you have to call next function, to send request to next middleware
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
  // Move to the next middleware or route handler
});

// localhost:3000"/" , homepage route
app.get("/", function (req, res) {
  res.send("hellow");
});

// localhost:3000"/login", login route
app.post("/login", (req, res) => {
  console.log({ req: req.body });

  const uname = req.body.username;
  const upass = req.body.password;

  const sqlQuery = `SELECT * FROM users WHERE username='${uname}' AND password='${upass}'`;

  console.log({ sqlQuery });

  db.query(sqlQuery, async (err, results) => {
    if (err) {
      console.log("error running query");
      res.send("error login");
    }

    if (results && results.length > 0) {
      console.log(results);
      res.send("login info is correct");
    } else {
      res.send("login info is not correct");
    }
  });

  console.log("hello");
});

app.post("/register", (req, res) => {
  // get details fom requests
  const user_name = req.body.username;
  const user_pass = req.body.password;

  // create sqlQuery (INSERT QUERY)
  const sqlInsertQuery = `INSERT INTO users (username, password) VALUE ('${user_name}', '${user_pass}');`;

  // execute query
  db.query(sqlInsertQuery, async (err, results) => {
    // handle error or handle results
    if (err) {
      console.log("error running InSERT query");
      console.log({ err });
      res.send("error register");
    } else {
      res.send("Register success");
    }
    // we will not check if(results), because insert query does not returns rows, only success or error
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
