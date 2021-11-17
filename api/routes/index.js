const express = require("express");

const router = express.Router();

const authRoutes = require("./auth");
const bookRoutes = require("./book");
const authorRoutes = require("./author");

module.exports = () => {
  router.get("/", (req, res) => {
    res.send("Welcome to Book Store API SERVER");
  });
  router.use("/auth", authRoutes());
  router.use("/book", bookRoutes());
  router.use("/author", authorRoutes());

  return router;
};
