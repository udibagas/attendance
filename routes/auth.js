const {
  showLoginForm,
  login,
  logout,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router
  .get("/login", showLoginForm)
  .post("/login", login)
  .post("/logout", authMiddleware, logout);

module.exports = router;
