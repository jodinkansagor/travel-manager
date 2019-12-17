const { Router } = require('express');
// const Trip = require('../Models/Trip');
const ItineraryItem = require('../Models/ItineraryItem');

const gottenWoeId = require('../middleware/get-woeid');

module.exports = Router()

  .post('/', gottenWoeId, (req, res) => {
    ItineraryItem
      .create({ ...req.body, woeId: req.woeId })
      .then(item => res.send(item));
  })

  .delete('/:id', (req, res) => {
    ItineraryItem
      .findByIdAndDelete(req.params.id)
      .then(item => res.send(item));
  });


