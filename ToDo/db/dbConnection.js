const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ToDo");
    console.log("connected to the database successfully");
  } catch (error) {
    console.log("error while connecting to the database");
  }
};
module.exports = { dbConnect };
