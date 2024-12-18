const express = require('express');
const router = express.Router();
const {
  createTheaterProfile,
  getTheaterProfile
} = require('../controller/TheaterManagementProfile');

// POST route to create a new theater profile
router.post('/theatermanagementprofile', createTheaterProfile);

// GET route to fetch a specific theater profile by theaterId
router.get('/theatermanagementprofile/:theaterId', getTheaterProfile);

module.exports = router;
