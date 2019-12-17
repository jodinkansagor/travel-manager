require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/Models/Trip');

jest.mock('../lib/services/woeid.js', () => ({
  makeWoeIdCall() {
    return Promise.resolve('my woeId');
  }
}));

jest.mock('../lib/services/weather.js', () => ({
  fetchWeather() {
    return Promise.resolve('My weather');
  }
}));



describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(() => {
    Trip.create({
      name: 'new vacation',
      departureDate: 'December 22, 2019',
      returnDate: 'January 5, 2020',
      destination: 'New Jersey',
      itineraryItems: {
        name: 'Duke Gardens',
        dateOfEvent: 28,
        monthOfEvent: 12,
        yearOfEvent: 2019,
        latitudeOfEvent: 40.51,
        longitudeOfEvent: -74.64
      }
    });
    console.log(this);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({ name: 'new vacation', departureDate: 'December 22, 2019', returnDate: 'January 5, 2020', destination: 'New Jersey' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'new vacation',
          departureDate: '2019-12-22T08:00:00.000Z',
          returnDate: '2020-01-05T08:00:00.000Z',
          destination: 'New Jersey',
          __v: 0
        });
      });
  });

  it('gets a trip by id', () => {
    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        expect(res.body.itineraryItems.weather).not.toBeNull;
      });
  });
});
