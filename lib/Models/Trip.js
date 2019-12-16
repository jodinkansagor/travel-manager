const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  }, 
  destination: {
    type: String,
    required: true
  }
});

schema.virtual('itineraryItems', {
  ref: 'ItineraryItem',
  localField: '_id',
  foreignField: 'itineraryItemId'
});

module.exports = mongoose.model('Trip', schema);
