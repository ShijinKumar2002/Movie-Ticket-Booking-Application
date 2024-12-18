const mongoose = require("mongoose");

const CrewSchema = new mongoose.Schema(
  {
    movieId: { type: "String" }, // Correct type for movieId
    movieTitle: { type: String, required: true },
    crewName: { type: String, required: true },
    crewPosition: { type: [String], default: ["Unknown"] }, // Ensure array and default value
    crewImage: { type: String }, // Path to crew image file
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crew", CrewSchema);
