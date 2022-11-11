const Product = require("../../models/Product");
require("dotenv").config();
const addProduct = (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    if (!(name && quantity && price)) {
      res.json({ success: false, msg: "Complete product info required" });
    }
    // add product
    Product.create({
      name,
      quantity,
      price,
    }).then(() => {
      res.json({
        success: true,
        msg: "Product successfully added to inventory",
      });
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const getAllProducts = (req, res) => {
  try {
    Product.find().then((products) => {
      res.json({ success: true, products });
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const editProduct = (req, res) => {
  const { _id } = req.body;
  // check if user send product ID
  if (_id) {
    // Find product
    Product.findOneAndUpdate(_id, req.body)
      .then((product) => {
        res.json({ success: true, msg: "Product info updated", product });
      })
      .catch((err) => {
        res.json({ success: true, msg: err.message });
      });
  } else {
    res.json({ success: false, msg: "Missing or Invalid Product ID" });
  }
};
const deleteProduct = (req, res) => {
  const { _id } = req.body;
  if (_id) {
    Product.findOneAndDelete(_id)
      .then(() => {
        res.json({ success: true, msg: "Product successfully deleted" });
      })
      .catch((err) => {
        res.json({ success: false, msg: err.message });
      });
  } else {
    res.json({ success: false, msg: "Missing or Invalid Product ID" });
  }
};
module.exports = { addProduct, getAllProducts, editProduct, deleteProduct };
