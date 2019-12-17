const mongoose = require('mongoose');
const { fetchWeather } = require('../services/weather');
const { makeWoeIdCall } = require('../services/woeId');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfEvent: {
    type: Number,
    required: true
  },
  monthOfEvent: {
    type: Number,
    required: true
  },
  yearOfEvent: {
    type: Number,
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
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Trip'
  }
});

schema.methods.getWoeId = function() {
  return makeWoeIdCall(this.latitudeOfEvent, this.longitutdeOfEvent)
    .then(woeId => {
      return woeId;
    });
};

schema.methods.getWeather = function() {
  return fetchWeather(this.woeId, this.dateOfEvent, this.monthOfEvent, this.yearOfEvent)
    .then(weather => {
      return weather;
    });
};

module.exports = mongoose.model('ItineraryItem', schema);

