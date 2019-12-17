const superagent = require('superagent');


const fetchWeather = (woeid, dateOfEvent, monthOfEvent, yearOfEvent) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/${woeid}/${yearOfEvent}/${monthOfEvent}/${dateOfEvent}/`)
    .then(res => {
      const { weather } = res.consolidated_weather[0].weather_state_name;

      return weather;
    });
};

module.exports = {
  fetchWeather
};

