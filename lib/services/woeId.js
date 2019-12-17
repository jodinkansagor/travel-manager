const superagent = require('superagent');


const getwoeid = (lat, long) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
    .then(res => {
      const [{ woeid }] = res.body;

      return woeid;
    });
};


module.exports = {
  getwoeid
};
