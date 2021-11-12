const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./api/routes");

const BookStore = require("./api/services/books");
const bookStore = new BookStore("./db/books.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "/",
  routes({
    bookStore,
  })
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
