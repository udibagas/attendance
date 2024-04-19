const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.use(require("./auth"));
router.use(authMiddleware);
router.get("/", (req, res) => {
  res.send("OK");
});

module.exports = router;
