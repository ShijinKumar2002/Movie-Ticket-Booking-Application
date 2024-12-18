// routes/crewInformation.route.js
const express = require("express");
const { addCrew , getCrewInfo} = require("../controller/Crewinformation.controller");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../public/crewimages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post(
  "/crewInformation",
  upload.single("crewImage"), // single image file for crew
  addCrew
);
router.get("/crewInformation/:movieId", getCrewInfo);

module.exports = router;
