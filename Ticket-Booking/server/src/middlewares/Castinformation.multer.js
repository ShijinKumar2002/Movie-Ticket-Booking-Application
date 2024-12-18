// config/multer.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the upload directory
const uploadDir = "src/public/castimages/";
// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Configure Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir), // Set destination folder to castimages
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname), // Create unique file names
});

// Initialize and export the Multer upload middleware
const upload = multer({ storage });
module.exports = upload;
