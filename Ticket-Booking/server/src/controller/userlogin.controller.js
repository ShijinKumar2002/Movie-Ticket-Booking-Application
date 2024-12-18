const mongoose = require("mongoose");
const register = require("../models/register.models");
const bcrypt = require("bcrypt");
const { geneateToken } = require("../middlewares/autoToken"); // Corrected function name

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate incoming data
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    // Check if the email exists
    const user = await register.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password." });
    }

    // Generate a token using the user ID (_id)
    const token = geneateToken(user.userId); // Assumes `generateToken` works with `_id`

    // Send only essential user info and the token
    res.json({
      user,
      token,
      message: "Login Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again.", error: error.message });
  }
};

module.exports = { userLogin };
