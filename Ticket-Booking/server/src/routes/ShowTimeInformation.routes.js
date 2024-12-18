// routes/showtimeRoutes.js
const express = require("express");
const router = express.Router();
const { saveShowtime } = require("../controller/ShowTimesInformation.controller");

// Route to save showtime information
router.post("/saveShowtime", saveShowtime);

module.exports = router;
