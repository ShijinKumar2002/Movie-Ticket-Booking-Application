const express = require("express");
const { addMovie, getMovies , getMovie } = require("../controller/MovieInformation.controller.js");
const upload = require("../middlewares/MovieInformation.multer.js"); // Correct `require` syntax for default import

const router = express.Router();

// Route for adding a new movie with image uploads
router.post("/movieInformation", upload.fields([
    { name: "movieImage", maxCount: 1 },
    { name: "posterImage", maxCount: 1 }
]), addMovie);

// Route to retrieve all movies
router.get("/movieInformation", getMovie);

// Route to retrieve a specific movie by ID
router.get("/movieInformation/:movieId", getMovies); // Add a handler if fetching a single movie by ID

module.exports = router; // Use CommonJS export syntax
