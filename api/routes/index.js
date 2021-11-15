const express = require("express");

const router = express.Router();

const booksController = require("../controllers/books");

module.exports = () => {
  router.get("/books", booksController.getBooks);
  router.post("/book", booksController.createBook);
  router.get("/book/:id", booksController.getBook);
  router.put("/book/:id", booksController.updateBook);
  router.delete("/book/:id", booksController.deleteBook);

  return router;
};
