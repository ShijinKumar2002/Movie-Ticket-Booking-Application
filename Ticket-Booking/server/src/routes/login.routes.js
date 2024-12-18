const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = require("../config/dotenv.config");
const TheaterManagementProfile = require("../models/TheaterManagementProfile"); // Adjust the path as needed

const router = express.Router();

// Admin Login Route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  // Validate Admin credentials
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a JWT token for admin
    const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, message: "Admin login successful", token });
  } else {
    return res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }
});

// Theater Management Profile Login Route
router.post("/TheaterManagementProfilelogin", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the theater management user in the database
    const user = await TheaterManagementProfile.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Generate a JWT token for theater management profile
      const token = jwt.sign({ username: user.username, role: "theaterAdmin" }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ success: true, message: "Login successful!", token, user });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});

// Example Protected Route for Admin Panel
router.get("/adminpanel", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: `Welcome to the Admin Panel, ${user.role}` });
  });
});

module.exports = router;
