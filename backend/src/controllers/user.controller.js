const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Example function for user registration
module.exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const isUserAlreadyExists = await user.findOne({ username });
  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = await user.create({
    username,
    password: await bcrypt.hash(password, 10),
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.status(201).json({ message: "User registered successfully" });
};

module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await user.findOne({ username });
    console.log("New User:", newUser);
    if (!newUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, newUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    console.log("JWT Secret:", process.env.JWT_SECRET);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    console.log("Token:", token);
    res.cookie("token", token);
    console.log("Cookies:", req.cookies);
    res.status(200).json({
      message: "User logged in successfully",
      user: { username: newUser.username, id: newUser._id },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
