const express = require("express");

const router = express.Router();

module.exports = (params) => {
  router.get("/books", async (req, res) => {
    try {
      const books = await params.bookStore.getBooksList();
      return res.json(books);
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
  router.post("/book", async (req, res) => {
    try {
      const { title, author, published, publisher } = req.body;
      await params.bookStore.addBook(
        title,
        author,
        published,
        publisher
      );
      return res.status(200).json({
        message: "Book added successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
  router.get("/book/:id", async (req, res) => {
    try {
      const book = await params.bookStore.getBook(req.params.id);
      return res.json(book);
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
  router.put("/book/:id", async (req, res) => {
    try {
      const book = await params.bookStore.updateBook(
        req.params.id,
        req.body
      );
      return res.json({
        book,
        message: "Book updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
  router.delete("/book/:id", async (req, res) => {
    try {
      await params.bookStore.deleteBook(req.params.id);
      return res.status(200).json({
        message: "Book deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  return router;
};
