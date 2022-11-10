const { Schema, model } = require("mongoose");
const product = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
});
const productModel = model("Product", product);
module.exports = productModel;
