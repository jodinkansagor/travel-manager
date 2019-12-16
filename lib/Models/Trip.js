const mongoose = require('mongoose');
const superagent = require('superagent');


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

schema.statics.getWoeId = function (itineraryItemId) {
  return this
    .findById(itineraryItemId)
    .then(trip => {
      return superagent
        .get(`http://https://www.metaweather.com/api/location/search/?latlong=${trip.itineraryItem.latitudeOfEvent},${trip.itineraryItem.longitudeOfEvent}`)
        .then(res => {
          const [{ woeId }] = res.woeid;

          return woeId;
        });
    });
};

module.exports = mongoose.model('Trip', schema);




