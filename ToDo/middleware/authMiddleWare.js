const jwt = require("jsonwebtoken");
const users = require("../modules/users.module");
const authValidator = (req, res, next) => {
  const tok = req.cookies.token;
  if (tok) {
    jwt.verify(tok, process.env.JWT_SECRET, async (err, decodedtoken) => {
      if (err) res.status(401).json({ error: err.message });
      else {
        next();
      }
    });
  } else res.status(401).json({ error: "Failed authentication" });
};
const checkUser = (req, res, next) => {
  const tok = req.cookies.token;
  if (tok) {
    const check = jwt.verify(
      tok,
      process.env.JWT_SECRET,
      async (error, decodedToken) => {
        if (error) res.status(401).json({ error: error.message });
        else {
          const user = await users.findOne({ _id: decodedToken.id });
          req.user = user;
          next();
        }
      }
    );
  } else res.status(401).json({ error: "Failed authentication" });
};
module.exports = { authValidator, checkUser };
