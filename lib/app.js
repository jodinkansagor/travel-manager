const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/trip', require('./routes/trip-routes'));
// app.use('/api/v1/itineraryItem', require('./routes/itineraryItem-route'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
