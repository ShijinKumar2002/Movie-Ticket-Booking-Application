// controllers/showtimeController.js
const Showtime = require("../models/ShowTimesInformation.models");

// Controller to save showtime information
exports.saveShowtime = async (req, res) => {
  const { movieTitle, showTimings, ticketPrices } = req.body;

  try {
    // Create a new Showtime document
    const newShowtime = new Showtime({
      movieTitle,
      showTimings,
      ticketPrices,
    });

    // Save to database
    const savedShowtime = await newShowtime.save();
    res.status(201).json({
      message: "Showtime information saved successfully",
      showtime: savedShowtime,
    });
  } catch (error) {
    console.error("Error saving showtime:", error);
    res.status(500).json({ error: "Failed to save showtime information" });
  }
};
