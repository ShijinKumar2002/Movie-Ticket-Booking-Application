const Cast = require("../models/CastInformation.models");
const upload = require("../middlewares/Castinformation.multer");

// Function to add new cast information
const addCastInformation = (req, res) => {
  // Upload the file first before processing form data
  upload.single("actorImage")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload error", details: err.message });
    }

    try {
      // Destructure required fields from the request body
      const { movieId, movieTitle, actorName, actorPosition } = req.body;

      // Check if all required fields are present
      if (!movieId || !movieTitle || !actorName || !actorPosition) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }

      // Create a new Cast entry
      const newCast = new Cast({
        movieId,
        movieTitle,
        actorName,
        actorPosition,
        actorImage: req.file ? req.file.filename : null, // Store file name if image uploaded
      });

      // Save the new cast information to the database
      await newCast.save();
      res.status(201).json({ message: "Cast information saved successfully!", cast: newCast });
    } catch (error) {
      console.error("Error saving cast information:", error);
      res.status(500).json({ error: "Failed to save cast information", details: error.message });
    }
  });
};

// Function to get cast information by movieId
const getCastInfo = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Fetch cast info for the specified movieId
    const castInfo = await Cast.find({ movieId });

    if (castInfo.length === 0) {
      return res.status(404).json({ message: "No cast information found for this movie" });
    }

    // Return the found cast information
    res.json(castInfo);
  } catch (error) {
    console.error("Error retrieving cast information:", error);
    res.status(500).json({ error: "Failed to retrieve cast information", details: error.message });
  }
};

module.exports = { addCastInformation, getCastInfo };
