const superagent = require('superagent');

const getwoeID = () =>
  return superagent
    .get(`http://https://www.metaweather.com/api/location/search/?query=${req.params.name}`)
    .then(res => {
      const
    })
