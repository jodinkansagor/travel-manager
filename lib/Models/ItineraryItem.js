const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfEvent: {
    type: Date,
    required: true
  },
  latitudeOfEvent: {
    type: Number,
    required: true
  },
  longitutdeOfEvent: {
    type: Number,
    required: true
  },
  weather: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ItineraryItem', schema);

