const superagent = require('superagent');


const makeWoeIdCall = (lat, long) => {
  return superagent
    .get(`http://https://www.metaweather.com/api/location/search/?latlong=${lat},${long}`)
    .then(res => {
      const [{ woeId }] = res.woeid;

      return woeId;
    });
};


module.exports = {
  makeWoeIdCall
};
