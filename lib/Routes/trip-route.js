const { Router } = require('express');
const Trip = require('../Models/Trip');
const ItineraryItem = require('../Models/ItineraryItem');



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
  })

  .get('/:id', (req, res) => {
    Trip
      .findById(req.params.id)
      .populate('itineraryItems')
      .then(trip =>
        Promise.all(trip
          .toJSON({ virtuals: true }).itineraryItems
          .map(item => item.getWeather()))
          .then(weathers => weathers.map((item, index) => ({ ...item, weather: weathers[index] })))
          .then(itineraryItems => res.send({ ...trip.toJSON(), itineraryItems })));
  })

  .patch('/:id', (req, res) => {
    Trip
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trip => res.send(trip));
  })

  .delete('/:id', (req, res) => {
    Promise.all([
      Trip.findByIdAndDelete(req.params.id),
      ItineraryItem.deleteMany({ tripId: req.params.id })
    ])
      .then(([trip]) => res.send(trip));
  });





