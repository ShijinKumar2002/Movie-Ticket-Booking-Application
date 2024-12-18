const TheaterAdditionalDetails = require('../models/TheaterAdditionalDetails.models');

// Save additional details for a theater
exports.saveAdditionalDetails = async (req, res) => {
  try {
    const { theaterID, theaterName, ...features } = req.body;

    // Validate required fields
    if (!theaterID || !theaterName) {
      return res.status(400).json({ message: 'Theater ID and Theater Name are required' });
    }

    // Create a new document using the model
    const additionalDetails = new TheaterAdditionalDetails({
      theaterID,
      theaterName,
      features,
    });

    // Save to the database
    const savedDetails = await additionalDetails.save();

    res.status(201).json({ message: 'Details saved successfully', details: savedDetails });
  } catch (error) {
    console.error('Error saving additional details:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
