const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // initiate express app

app.use(bodyParser.json()); // use bodyparser as middleware to hadle body of request.

// custom middleware, you have to call next function, to send request to next middleware
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
  // Move to the next middleware or route handler
});

app.get("/", function (req, res) {
  res.send("hellow");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
