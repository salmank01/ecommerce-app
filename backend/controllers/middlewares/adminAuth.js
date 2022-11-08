const jwt = require("jsonwebtoken");
require("dotenv").config();

async function adminAuth(req, res, next) {
  try {
    const token = req.body.token || req.headers["x-access-token"];
    if (token) {
      // verify token
      await jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
        if (error) {
          res.json({
            success: false,
            error: "Unauthorized Access",
          });
        }
        // check if its a customer token
        else if (decodedToken.role === "customer") {
          res.json({ success: false, error: "Unauthorized Access. Admins allowed only" });
        } else {
          // Authorization successful, hence open the gate
          next();
        }
      });
    } else {
      res.json({ success: false, error: "token not available" });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}
module.exports = adminAuth;
