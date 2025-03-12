const todos = require("../modules/todos.module");
const getTodos = async (req, res) => {
  const user = req.user;
  let todo = [];
  try {
    todo = await todos.find({ user: user._id });
    if (todo.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No todos found for this user",
      });
    }
    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const getRemainTodos = async (req, res) => {
  const user = req.user;
  let remainTodo = [];
  try {
    remainTodo = await todos.find({ user: user._id, status: false });
    if (remainTodo.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No remain todos found for this user",
      });
    }
    res.status(201).json({
      success: true,
      remainTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  getTodos,
  getRemainTodos,
};
