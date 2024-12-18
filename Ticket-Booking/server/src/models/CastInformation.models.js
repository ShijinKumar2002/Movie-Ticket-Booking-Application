// models/Cast.js
const mongoose = require("mongoose");

const CastSchema = new mongoose.Schema({
  movieId: { type: "string"},
  movieTitle: {
    type: String,
    required: true,
  },
  actorName: {
    type: String,
    required: true,
  },
  actorPosition: {
    type: String,
    required: true,
  },
  actorImage: {
    type: String, // Path to the actor's image
  },
}, { timestamps: true });

module.exports = mongoose.model("Cast", CastSchema);
