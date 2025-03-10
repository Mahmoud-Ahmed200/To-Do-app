const jwt = require("jsonwebtoken");
const authValidator = (req, res, next) => {
  const token = req.cookie.token;
  if (token) {
    jwt.verify(token, "temporary secret key", (decodedToken, err) => {
      if (err) res.status(401).json({ error: err.message });
      else {
        res.status(201);
        next();
      }
    });
  } else res.status(401).json({ message: "redirecting to login page" });
};
