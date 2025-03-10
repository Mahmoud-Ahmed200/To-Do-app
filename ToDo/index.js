const express = require("express");
const { dbConnect } = require("./db/dbConnection");
const authRouter = require("./routes/auth.router");
const users = require("./modules/users.module");
const app = express();
const port = 3000;
app.listen(port, () => {
  dbConnect();
  console.log(`server listening on port ${port}`);
});
app.use(express.json());
app.use("/auth", authRouter);
