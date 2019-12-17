const mongoose = require('mongoose');
const { fetchWeather } = require('../services/weather');
// const { getwoeid } = require('../services/woeid');

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
  longitudeOfEvent: {
    type: Number,
    required: true
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Trip'
  },
  woeid: {
    type: Number,
    required: true
  }

});

schema.statics.getWeather = async function() {
  return await fetchWeather(this.woeid, this.dateOfEvent, this.monthOfEvent, this.yearOfEvent);
};

// schema.statics.getWeather = function () {
//   return fetchWeather(this.woeid, this.dateOfEvent, this.monthOfEvent, this.yearOfEvent)
//     .then(weather => {
//       return weather;
//     });
// };

module.exports = mongoose.model('ItineraryItem', schema);

