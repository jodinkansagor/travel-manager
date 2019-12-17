require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/Models/Trip');
// const ItineraryItem = require('../lib/Models/ItineraryItem');

// jest.mock('../lib/services/woeid.js', () => ({
//   getWoeId() {
//     return Promise.resolve('my woeId');
//   }
// }));

// jest.mock('../lib/services/weather.js', () => ({
//   fetchWeather() {
//     return Promise.resolve('My weather');
//   }
// }));



describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  // let trip;
  // let intineraryItem;
  // beforeEach(async () => {
  //   trip = await Trip
  //     .create({
  //       name: 'new vacation',
  //       departureDate: 'December 22, 2019',
  //       returnDate: 'January 5, 2020',
  //       destination: 'New Jersey'
  //     });
  //   intineraryItem = await ItineraryItem
  //     .create([
  //       {
  //         name: 'Duke Gardens',
  //         dateOfEvent: 28,
  //         monthOfEvent: 12,
  //         yearOfEvent: 2019,
  //         latitudeOfEvent: 40.51,
  //         longitudeOfEvent: -74.64,
  //         trip: `${trip._id}`,
  //         weather: 'its freakin raining'
  //       }
  //     ]);
  // });



  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        name: 'new vacation', departureDate: 'December 22, 2019', returnDate: 'January 5, 2020', destination: 'New Jersey'
      })
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

  it('gets all trips', async () => {
    const trips = await Trip.create([
      {
        name: 'go home', departureDate: '2019-12-22T08:00:00.000Z',
        returnDate: '2020-01-05T08:00:00.000Z',
        destination: 'New Jersey'
      }
    ]);
    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual({
            _id: trip._id.toString(),
            name: trip.name
          });
        });
      });
  });

  it('gets a trip by id', async () => {
    const trip = await Trip.create({
      name: 'go home', departureDate: '2019-12-22T08:00:00.000Z',
      returnDate: '2020-01-05T08:00:00.000Z',
      destination: 'New Jersey'
    });

    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'go home', departureDate: '2019-12-22T08:00:00.000Z',
          returnDate: '2020-01-05T08:00:00.000Z',
          destination: 'New Jersey',
          itineraryItems: [],
          __v: 0
        });
      });
  });

  it('can update one trip', async () => {
    const trip = await Trip.create({
      name: 'go home', departureDate: '2019-12-22T08:00:00.000Z',
      returnDate: '2020-01-05T08:00:00.000Z',
      destination: 'New Jersey'
    });

    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ name: 'excited to be home' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'excited to be home', departureDate: '2019-12-22T08:00:00.000Z',
          returnDate: '2020-01-05T08:00:00.000Z',
          destination: 'New Jersey',
          __v: 0
        });
      });
  });

  it('can delete a trip', async () => {
    const trip = await Trip.create({
      name: 'excited to be home', departureDate: '2019-12-22T08:00:00.000Z',
      returnDate: '2020-01-05T08:00:00.000Z',
      destination: 'New Jersey'
    });
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'excited to be home', departureDate: '2019-12-22T08:00:00.000Z',
          returnDate: '2020-01-05T08:00:00.000Z',
          destination: 'New Jersey',
          __v: 0
        });
      });
  });

});
