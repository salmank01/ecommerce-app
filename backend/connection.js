const mongoose = require("mongoose");
require("dotenv").config();
const connectionDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.yjhed.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => console.log("connection established"))
    .catch((err) => console.log(err));
};

module.exports = connectionDB;
