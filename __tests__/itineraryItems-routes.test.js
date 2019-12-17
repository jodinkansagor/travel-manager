require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/Models/Trip');
const ItineraryItem = require('../lib/Models/ItineraryItem');


describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let londonTrip;
  let longBuckby;

  beforeEach(async () => {
    londonTrip = await Trip
      .create({
        name: 'excited to be away', departureDate: '2019-12-22T08:00:00.000Z',
        returnDate: '2020-01-05T08:00:00.000Z',
        destination: 'London'
      });

    longBuckby = await ItineraryItem
      .create({
        name: 'London',
        dateOfEvent: 28,
        monthOfEvent: 11,
        yearOfEvent: 2019,
        latitudeOfEvent: 51.5,
        longitudeOfEvent: -.12,
        tripId: londonTrip._id,
        woeid: 444418
      });

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an itinerary item', () => {
    return request(app)
      .post('/api/v1/itineraryItems')
      .send({
        name: 'London',
        dateOfEvent: 28,
        monthOfEvent: 11,
        yearOfEvent: 2019,
        latitudeOfEvent: 51.5,
        longitudeOfEvent: -0.12,
        tripId: londonTrip._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'London',
          dateOfEvent: 28,
          monthOfEvent: 11,
          yearOfEvent: 2019,
          latitudeOfEvent: 51.5,
          longitudeOfEvent: -0.12,
          tripId: londonTrip._id.toString(),
          woeid: res.body.woeid,
          __v: 0
        });
      });
  });

  it('deletes an itinerary item', () => {
    return request(app)
      .delete(`/api/v1/itineraryItems/${longBuckby._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'London',
          dateOfEvent: 28,
          monthOfEvent: 11,
          yearOfEvent: 2019,
          latitudeOfEvent: 51.5,
          longitudeOfEvent: -0.12,
          tripId: expect.any(String),
          woeid: 444418,
          __v: 0
        });
      });

  });

});
