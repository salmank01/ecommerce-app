const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// SignUp logic starts here
const signup = async (req, res, next) => {
  try {
    // check if user sent complete credentials
    const { role, name, username, password } = req.body;
    if (!(name && username && password)) {
      res.json({ success: false, msg: "All input fields required" });
    }
    // check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.json({ succes: false, msg: "Username already taken" });
    }
    // CREATE USER

    // Hash Password
    const hash = await bcrypt.hash(password, 10);
    // create user
    const newUser = await User.create({
      name,
      username,
      password: hash,
      role,
    });
    // Sign a JWT token
    const token = await jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.jwtSecret,
      {
        expiresIn: "2hr",
      }
    );
    return res.json({ success: true, msg: "User Created", token });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// login logic starts here
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // check for incomplete credentials
    console.log(req.body)
    if (!username || !password) {
      return res.json({ success: false, msg: "All input fields are required" });
    }
    // verify username
    const user = await User.findOne({ username });
    // verify password
    const verification = await bcrypt.compare(password, user.password);
    if (user && verification) {
      // sign a jwt token
      const token = await jwt.sign(
        { id: user._id, role: user.role },
        process.env.jwtSecret,
        {
          expiresIn: "2hr",
        }
      );
      return res.json({
        success: true,
        msg: "Access Granted",
        token,
      });
    }
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

const update = async (req, res, next) => {
  try {
    const { role, id } = req.body;
    if (!role || !id) {
      res.json({
        success: false,
        error: "incomplete information",
      });
    }
    // if user does not exist in db
    const user = await User.findById(id);
    if (!user) {
      res.json({
        success: false,
        error: "user does not exist",
      });
    }
    // check if user is already admin
    if (user.role === "admin") {
      res.json({
        success: false,
        error: "user is already an admin",
      });
    }

    // update role
    user.role = role;
    user.save((error) => {
      if (error) {
        res.json({ success: false, error });
      } else {
        res.json({
          sucess: true,
          msg: "user is now an admin",
        });
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const getAll = async (req, res, next) => {
  const users = await User.find();
  if (users) {
    res.json({ success: true, users });
  } else {
    res.json({ success: false, msg: error.message });
  }
};

module.exports = { signup, login, update, getAll };
