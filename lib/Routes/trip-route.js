const { Router } = require('express');
const Trip = require('../Models/Trip');
const ItineraryItem = require('../Models/ItineraryItem');
const { fetchWeather } = require('../services/weather');


module.exports = Router()

  .post('/', (req, res, next) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    
  })
  



