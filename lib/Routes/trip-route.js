const { Router } = require('express');
const Trip = require('../Models/Trip');
const ItineraryItem = require('../Models/ItineraryItem');

module.exports = Router()

  .post('/', fetchWeather (req, res) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip));
  })

  .get('/', (req, res) => {
    Trip
      .find()
      .then(trips => res.send(trips));
  })

  .get('/:id', (req, res) => {
    Trip
      .findById(req.params.id)
      .populate('itineraryItems');
      .then(trip => {
        res.send(trip.toJSON({ virutals: true }));
      })
  })

  .patch('/:id', (req, res) => {
    Trip
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trip => res.send(trip));
  })