const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, default: "customer" },
});
const User = model("User", userSchema);
module.exports = User;
