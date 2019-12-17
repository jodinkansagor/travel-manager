const superagent = require('superagent');


const fetchWeather = (woeId, dateOfEvent, monthOfEvent, yearOfEvent) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/${woeId}/${yearOfEvent}/${monthOfEvent}/${dateOfEvent}/`)
    .then(res => {
      const { weather } = res.consolidated_weather[0].weather_state_name;

      return weather;
    });
};

module.exports = {
  fetchWeather
};

