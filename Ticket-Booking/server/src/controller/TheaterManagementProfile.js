const bcrypt = require('bcrypt');
const TheaterManagementProfile = require('../models/TheaterManagementProfile');
const { v4 } = require('uuid');


// Create a new theater profile
const createTheaterProfile = async (req, res) => {
  const {
    theaterName,
    theaterAddress,
    district,
    contactNumber,
    username,
    password,
    role,
    theaterManagementEmail,
  } = req.body;

  if (
    !theaterName ||
    !theaterAddress ||
    !district ||
    !contactNumber ||
    !username ||
    !password ||
    !theaterManagementEmail
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await TheaterManagementProfile.findOne({
      $or: [
        { username: username.trim() },
        { theaterManagementEmail: theaterManagementEmail.trim() },
      ],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newProfile = new TheaterManagementProfile({
      theaterName: theaterName.trim(),
      theaterAddress: theaterAddress.trim(),
      district: district.trim(),
      contactNumber: contactNumber.trim(),
      username: username.trim(),
      password: hashedPassword,
      role: role || 'theateradmin',
      theaterManagementEmail: theaterManagementEmail.trim(),
      theaterId: v4(),
    });

    await newProfile.save();
    res.status(201).json({
      message: 'Theater profile created successfully!',
      theaterName: newProfile.theaterName,
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getTheaterProfile = async (req, res) => {
  try {
    const { theaterId } = req.params;

    if (!theaterId) {
      return res.status(400).json({ message: 'Theater ID is required' });
    }

    const theaterProfile = await TheaterManagementProfile.findById(theaterId);

    if (!theaterProfile) {
      return res.status(404).json({ message: 'Theater profile not found' });
    }

    res.status(200).json(theaterProfile);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTheaterProfile, getTheaterProfile };
