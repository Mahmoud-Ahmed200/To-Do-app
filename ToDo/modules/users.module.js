const { isEmail } = require("validator");
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 18,
    trim: true,
  },
  todo: [
    {
      type: mongoose.Types.ObjectId,
      ref: "todo",
    },
  ],
});
userSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt();
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
const users = mongoose.model("user", userSchema);
module.exports = users;
