const todos = require("../modules/todos.module");
const addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const user = req.user;
    const todo = await todos.create({
      title,
      description,
      status,
      user: user._id,
    });
    user.todo.push(todo._id);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Todo added successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const todo = await todos.findOneAndUpdate(
      { _id: id },
      [{ $set: { status: { $not: "$status" } } }],
      { returnDocument: "after" }
    );
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }
    if (todo.user.toString() !== user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: "Failed authentication",
      });
    }
    res.status(201).json({
      success: true,
      message: "Todo status updated successfully",
    });
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed"))
      return res.status(404).json({
        success: false,
        error: "Invalid todo id",
      });
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const todo = await todos.findOneAndDelete({ _id: id });
    if (!todo)
      return res.status(404).json({
        success: false,
        error: "Todo is not found",
      });
    if (user._id.toString() !== todo.user.toString()) {
      res.status(401).json({
        success: false,
        error: "Failed authentication",
      });
    }
    res.status(201).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed"))
      return res.status(404).json({
        success: false,
        error: "Invalid todo id",
      });
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const todo = await todos.findOne({ _id: id });
    if (!todo)
      return res.status(404).json({
        success: false,
        error: "Todo is not found",
      });
    if (user._id.toString() !== todo.user.toString()) {
      res.status(401).json({
        success: false,
        error: "Failed authentication",
      });
    }
    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed"))
      return res.status(404).json({
        success: false,
        error: "Invalid todo id",
      });
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  addTodo,
  changeStatus,
  deleteTodo,
  getTodo,
};
