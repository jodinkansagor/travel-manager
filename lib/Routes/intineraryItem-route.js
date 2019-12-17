const { Router } = require('express');
// const Trip = require('../Models/Trip');
const ItineraryItem = require('../Models/ItineraryItem');

const gottenwoeid = require('../middleware/get-woeid');

module.exports = Router()

  .post('/', gottenwoeid, (req, res) => {
    ItineraryItem
      .create({ ...req.body, woeid: req.woeid })
      .then(item => res.send(item));
  })

  .delete('/:id', (req, res) => {
    ItineraryItem
      .findByIdAndDelete(req.params.id)
      .then(item => res.send(item));
  });


