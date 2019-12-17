const { getwoeid } = require('../services/woeid');

module.exports = (req, res, next) => {
  const lat = req.body.latitudeOfEvent;
  const long = req.body.longitudeOfEvent;

  try {
    getwoeid(lat, long)
      .then(woeid => {
        req.woeid = woeid,
        next();
      });
  }
  catch(err) {
    err.status = 400;
    next(err);
  }
};
