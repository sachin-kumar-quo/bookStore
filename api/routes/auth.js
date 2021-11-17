const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

module.exports = () => {
  router.get("/login", authController.login);
  router.post("/register", authController.register);

  return router;
};
