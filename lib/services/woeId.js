const superagent = require('superagent');


const getWoeId = (lat, long) => {
  return superagent
    .get(`http://https://www.metaweather.com/api/location/search/?latlong=${lat},${long}`)
    .then(res => {
      const [{ woeId }] = res.body;

      return woeId;
    });
};


module.exports = {
  getWoeId
};
