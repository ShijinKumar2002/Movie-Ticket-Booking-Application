const multer = require("multer");
const fs = require("fs"); // Added the missing fs import
const path = require("path");

// Define the upload directory (relative path)
const uploadDir = "src/public/movieimages";

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creating the directory if it doesn't exist
}

// Configure Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir), // Setting destination folder
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname), // Creating unique file names
});

// Initialize and export the Multer upload middleware
const upload = multer({ storage });

// Export using CommonJS syntax
module.exports = upload;
