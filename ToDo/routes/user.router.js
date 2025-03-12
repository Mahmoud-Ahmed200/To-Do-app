const { Router } = require("express");
const router = Router();
const controller = require("../controllers/user.controller");
router.get("/get-todos", controller.getTodos);
router.get("/get-remain-todo", controller.getRemainTodos);
module.exports = router;
