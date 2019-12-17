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
    Trip
      .find()
      .select({ name: true })
      .then(trips => res.send(trips))
      .catch(next);
  });

  // .get('/:id', (req, res, next) => {
  //   Trip
  //     .getById(req.params.id)
  //     .then(trip => res.send(trip))
  //     .catch(next);
  // })




