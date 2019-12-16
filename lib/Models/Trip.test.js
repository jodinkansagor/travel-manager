const mongoose = require('mongoose');
const Trip = require('./Trip');

describe('Trip model', () => {
  it('has a required name', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required departure Date', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.departureDate.message).toEqual('Path `departureDate` is required.');
  });

  it('has a required returnDate', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.returnDate.message).toEqual('Path `returnDate` is required.');
  });

  it('has a required destination', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.destination.message).toEqual('Path `destination` is required.');
  });

});
