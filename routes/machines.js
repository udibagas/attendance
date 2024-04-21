const {
  index,
  create,
  update,
  destroy,
  show,
} = require("../controllers/machine.controller");

const router = require("express").Router();

router
  .get("/", index)
  .post("/", create)
  .get("/:id", show)
  .put("/:id", update)
  .delete("/:id", destroy);

module.exports = router;
