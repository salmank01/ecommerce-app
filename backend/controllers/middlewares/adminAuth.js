const jwt = require("jsonwebtoken");
require("dotenv").config();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE0MWNmZGNiNTg0ZTM1NWIyZWVkNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODA3NTA4OCwiZXhwIjoxNjY4MDgyMjg4fQ.AxUS_gHlXgRZNmZL9L073fk8s2GqpbgBYr4qUtwSZF0";
const v = async () => {
  await jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
    if (err) {
      console.log(err);
    }
    console.log(decodedToken);
  });
};
console.log(token);

async function adminAuth(req, res, next) {
  try {
    const tokenn = req.headers["x-access-token"];
    if (tokenn) {
      // verify token
      console.log(tokenn);
      await jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
        if (error) {
          console.log(error);
          res.json({
            success: false,
            error: error.message,
          });
        }
        // check if its a customer token
        else if (decodedToken.role === "customer") {
          res.json({
            success: false,
            error: "Unauthorized Access. Admins allowed only",
          });
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
