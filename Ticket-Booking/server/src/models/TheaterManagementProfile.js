const mongoose = require('mongoose');
const { v4 } = require("uuid");

const theaterManagementSchema = new mongoose.Schema({
  _id: { type: String, default: v4 },
  theaterId: {
    type: String,
    default: v4,  // Automatically generates UUID v4 for each theater
    unique: true,
  },
  theaterName: { type: String, required: true },
  theaterManagementEmail: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theaterAddress: { type: String, required: true },
  district: { type: String, required: true },
  contactNumber: { type: String, required: true },
  role: { type: String, default: 'theateradmin' },
}, { timestamps: true });

module.exports = mongoose.model('TheaterManagementProfile', theaterManagementSchema);
