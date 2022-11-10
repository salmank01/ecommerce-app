const { signup, login, update, getAll } = require("./auth");
const { getAllProducts, addProduct } = require("./products");
const adminAuth = require("./adminAuth");
const customerAuth = require("./customerAuth");
const express = require("express");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/users").get(getAll);
router.route("/admin").get(adminAuth, (req, res) => {
  res.send("admin route");
});
router.route("/customer", customerAuth, (req, res) =>
  res.send("customer route")
);

// Products route
router
  .route("/products")
  .get(adminAuth, getAllProducts)
  .post(adminAuth, addProduct);
module.exports = router;
