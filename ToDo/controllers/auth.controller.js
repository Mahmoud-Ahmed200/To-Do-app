const users = require("../modules/users.module");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const bcrypt = require("bcrypt");
const createToken = (id) => {
  return jwt.sign({ id }, "temporary secret key", {
    expiresIn: 60 * 60 * 24,
  });
};
/*
error handling to be done:messages should be more expressive,
differentiate between if the error is a bad request or a server error
*/
const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const check = await users.find({ email });
    if (check.length !== 0) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }
    const user = await users.create({ email, password, username });
    const token = createToken(user._id);
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/*error handling to be done:if the user enters invalid email the message that shows
 "email is not registered" but it should give sign to the user that the email is invalid"*/
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const token = createToken(user._id);
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.status(201).json({
          success: true,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      } else
        res.status(401).json({
          success: false,
          error: "Incorrect email or password",
        });
    } else
      res.status(401).json({
        success: false,
        error: "Email is not registered",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const signout = (req, res) => {
  try {
    res.cookie("token", "clearToken", { maxAge: 10 }).status(201).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  //redirecting to the home page after that but the frontend not implemented yet
};

module.exports = { signup, signin, signout };
