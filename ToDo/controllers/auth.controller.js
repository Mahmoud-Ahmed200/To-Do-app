const users = require("../modules/users.module");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const bcrypt = require("bcrypt");
const createToken = (id) => {
  return jwt.sign({ id }, "temporary secret key", {
    expiresIn: 60 * 60 * 24,
  });
};
const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await users.insertOne({ email, password, username });
    const token = createToken(user._id);
    res.cookie("token", token, { maxAge: 1000 * 60 * 6024, httpOnly: true });
    res.status(201).json({ user, message: "user added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const token = createToken(user._id);
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 6024,
          httpOnly: true,
        });
        res.status(201).json({ message: "logged in successfully" });
      } else res.status(401).json({ error: "incorrect email of password" });
    } else res.status(401).json({ error: "email is not registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const signout = (req, res) => {
  res.cookie("token", "clearToken", { maxAge: 10 });
};

module.exports = { signup, signin, signout };
