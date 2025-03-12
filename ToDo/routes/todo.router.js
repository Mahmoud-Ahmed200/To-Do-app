const { Router } = require("express");
const router = Router();
const controller = require("../controllers/todo.controller");
router.post("/add-todo", controller.addTodo);
router.put("/change-status/:id", controller.changeStatus);
router.delete("/delete-todo/:id", controller.deleteTodo);
router.get("/getById/:id", controller.getTodo);
module.exports = router;
