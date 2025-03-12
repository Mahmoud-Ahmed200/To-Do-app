const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
    trim: true,
    maxlength: 50,
  },
  description: {
    required: false,
    type: String,
    trim: true,
    maxlength: 700,
  },
  status: {
    required: true,
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
const todos = mongoose.model("todo", todoSchema);
module.exports = todos;
