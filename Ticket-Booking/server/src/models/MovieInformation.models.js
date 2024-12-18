const mongoose = require("mongoose");
const { v4 } = require("uuid");

const movieSchema = new mongoose.Schema({
  _id: { type: String, default: v4 },
  
  movieId: {
    type: String,
    default: v4,  // Automatically generates UUID v4 for each movie
    unique: true,
  },
  movieTitle: { 
    type: String, 
    required: true,
    trim: true // Removes extra whitespace
  },
  genreTitle: {
    type: [String], // Array of strings for multiple genres
    trim: true,
    default: ["Unknown"]
  },  
  language: {
    type: [String],
    trim: true,
    default: ["Unknown"]
  },
  releaseDate: {
    type: Date,
  },
  duration: {
    type: String,
  },
  ageRating: {
    type: String,
    default: "Unrated"
  },
  description: {
    type: String,
    trim: true
  },
  movieImage: {
    type: String,
    trim: true
  },
  posterImage: {
    type: String,
    trim: true
  }
  });

module.exports = mongoose.model("movieInformation", movieSchema);
