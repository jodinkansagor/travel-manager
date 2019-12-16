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
  locationOfEvent: {
    type: Date,
    required: true
  }, 
  weather: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ItineraryItem', schema);

