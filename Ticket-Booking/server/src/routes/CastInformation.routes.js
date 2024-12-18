const express = require("express");
const { addCastInformation, getCastInfo } = require("../controller/Castinformation.controller");
const router = express.Router();

// Route to add cast information (POST only)
router.post("/castInformation", addCastInformation);

// Route to get cast information by movieId (GET)
router.get("/castInformation/:movieId", getCastInfo);

module.exports = router;
