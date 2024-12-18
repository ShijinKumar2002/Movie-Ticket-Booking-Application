// models/Showtime.js
const mongoose = require("mongoose");

const ShowtimeSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: true,
  },
  showTimings: [
    {
      type: String, // Can be a `String` or `Date` if you need time only
      required: true,
    },
  ],
  ticketPrices: {
    regular: { type: Number, required: true },
    premium: { type: Number, required: true },
    vip: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Showtime", ShowtimeSchema);
