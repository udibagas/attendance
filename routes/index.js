const { home } = require("../controllers/main.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.use(require("./auth"));
router.use(authMiddleware);
router.get("/", home);
router.use("/machines", require("./machines"));
router.use("/employees", require("./employee"));

module.exports = router;
