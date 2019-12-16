const { Router } = require('express');
const Trip = require('../Models/Trip');

module.exports = Router()

  .post('/', (req, res) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip));
  })

  .get()