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
  foreignField: 'trip'
});

schema.statics.findByIdWithWeather = async function(id) {
  const trip = await this
    .findById(id)
    .populate('itineraryItems');
  const itinerary = await Promise.all(trip.itineraryItems.map(item => {
    item.getWeather();
  }));

  return {
    ...trip.toJSON(),
    itinerary
  };
}

module.exports = mongoose.model('Trip', schema);




