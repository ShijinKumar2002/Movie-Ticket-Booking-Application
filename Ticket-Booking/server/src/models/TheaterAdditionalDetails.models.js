const mongoose = require('mongoose');

// Define schema for theater additional details
const TheaterAdditionalDetailsSchema = new mongoose.Schema({
  theaterID: { type: String, required: true },
  theaterName: { type: String, required: true },
  features: {
    foodAndBeverages: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    sofa: { type: Boolean, default: false },
    rgbLaser: { type: Boolean, default: false },
    fourK: { type: Boolean, default: false },
    dolbyAtmos: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    metroNearby: { type: Boolean, default: false },
    digitalPayments: { type: Boolean, default: false },
    mobileTicket: { type: Boolean, default: false },
  },
}, { timestamps: true });

module.exports = mongoose.model('TheaterAdditionalDetails', TheaterAdditionalDetailsSchema);
