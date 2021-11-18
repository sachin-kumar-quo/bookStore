const express = require("express");

const router = express.Router();

const booksController = require("../controllers/books");
const authController = require("../controllers/auth");

module.exports = () => {
  router.get("/", booksController.getBooks);
  router.post("/", booksController.createBook);
  router.get("/:id", booksController.getBook);
  router.put("/:id", booksController.updateBook);
  router.delete("/:id", booksController.deleteBook);

  return router;
};
