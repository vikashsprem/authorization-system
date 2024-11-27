const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: "user",
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.status(201).json({ newUser, message: "User created", token });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid crednetials" });
    }
    const token = jwt.sign(
      { email: user.email, role: user.role, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    user.password = undefined;
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = {
  register,
  login,
};
