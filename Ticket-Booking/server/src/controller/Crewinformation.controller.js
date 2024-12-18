const Crew = require("../models/Crewinformation.models"); // Import the Crew model
const upload = require("../middlewares/Crewinformation.multer"); // Import the multer configuration

const addCrew = async (req, res) => {
  try {
    const { movieTitle, crewName, crewPosition, movieId } = req.body;

    // Check for required fields
    if (!movieTitle || !crewName || !crewPosition || !movieId) {
      return res.status(400).json({ message: "All fields are required: movieTitle, crewName, crewPosition, movieId" });
    }

    // Extract only the file name of the uploaded image (if any)
    const crewImage = req.file ? req.file.filename : null;

    // Create a new crew entry
    const crew = new Crew({
      movieId,
      movieTitle,
      crewName,
      crewPosition: Array.isArray(crewPosition) ? crewPosition : [crewPosition], // Ensure array
      crewImage,
    });

    await crew.save();
    res.status(201).json({ message: "Crew information saved successfully!", crew });
  } catch (error) {
    console.error("Error saving crew information:", error);
    res.status(500).json({ message: "Failed to save crew information", error: error.message });
  }
};

const getCrewInfo = async (req, res) => {
  try {
    const { movieId } = req.params;
    
    const crewInfo = await Crew.find({movieId});
    
    if (!crewInfo.length === 0) {
      return res.status(404).json({ message: "No crew information found for this movie" });
    }

    res.status(200).json(crewInfo);
  } catch (error) {
    console.error("Error in getCrewInfo:", error);
    res.status(500).json({ error: "Failed to retrieve crew information", details: error.message });
  }
};


module.exports = { addCrew, getCrewInfo };
