const express = require("express");
const cookieparser = require("cookie-parser");
const { dbConnect } = require("./db/dbConnection");
const authRouter = require("./routes/auth.router");
const todoRouter = require("./routes/todo.router");
const userRouter = require("./routes/user.router");
const { authValidator, checkUser } = require("./middleware/authMiddleWare");
const users = require("./modules/users.module");
const app = express();
const port = 3000;
app.listen(port, () => {
  dbConnect();
  console.log(`server listening on port ${port}`);
});
app.use(express.json());
app.use(cookieparser());
app.use("/auth", authRouter);
app.use("/user", checkUser, userRouter);
app.use("/todo", checkUser, todoRouter);
