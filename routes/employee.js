const { index } = require("../controllers/employee.controller");

const router = require("express").Router();
router.get("/", index);

module.exports = router;
