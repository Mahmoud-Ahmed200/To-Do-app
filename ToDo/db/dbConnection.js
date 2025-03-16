const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to the database successfully");
  } catch (error) {
    console.log("error while connecting to the database");
  }
};
module.exports = { dbConnect };
