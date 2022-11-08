const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.customerAuth = async (req, res, next) => {
  try {
    const token = req.body.token || req.headers["x-access-token"]
    if (token) {
      // verify token
      jwt.verify(token, process.env.jwtSecret).then((err, decodedToken) => {
        if (err) {
          res.json({ success: false, error: "Unauthorized access" });
        } else if (decodedToken.role !== "customer") {
          res.json({ success: false, error: "Unauthorized access" });
        } else {
          // allow access
          next();
        }
      });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};
