const express = require("express");

const router = express.Router();

const authorController = require("../controllers/author");

module.exports = () => {
  router.get("/", authorController.getAuthors);
  router.post("/", authorController.createAuthor);
  router.get("/:id", authorController.getAuthor);
  router.put("/:id", authorController.updateAuthor);
  router.delete("/:id", authorController.deleteAuthor);

  return router;
};
