const superagent = require('superagent');


const fetchWeather = (woeId, dateOfEvent, monthOfEvent, yearOfEvent) => {
  return superagent
    .get(`http://https://www.metaweather.com/api/location/${woeId}/${yearOfEvent}/${monthOfEvent}/${dateOfEvent}`)
    .then(res => {
      const { weather_state_name } = res.body.consolidated_weather[0];

      return weather_state_name;
    });
};

module.exports = {
  fetchWeather
};

