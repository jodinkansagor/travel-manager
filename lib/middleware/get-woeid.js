const { getWoeId } = require('../services/woeId');

module.exports = (req, res, next) => {
  const lat = req.body.latitudeOfEvent;
  const long = req.body.longitudeOfEvent;

  try {
    getWoeId(lat, long)
      .then(woeId => {
        req.woeId = woeId,
        next();
      });
  }
  catch(err) {
    err.status = 400;
    next(err);
  }
};
