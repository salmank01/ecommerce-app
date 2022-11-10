const Product = require("../../models/Product");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const addProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    if (!(name && quantity && price)) {
      res.json({ success: false, msg: "Complete product info required" });
    }
    // add product
    await Product.create({
      name,
      quantity,
      price,
    })
      .then(() => {
        res.json({
          success: true,
          msg: "Product successfully added to inventory",
        });
      })
      .catch(() => {
        res.json({ success: false, msg: "Operation unsuccessful" });
      });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};
module.exports = { addProduct, getAllProducts };
