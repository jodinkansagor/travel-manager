const mongoose = require('mongoose');
const ItineraryItem = require('./ItineraryItems');

describe('ItineraryItems model', () => {
  it('has a required name', () => {
    const itineraryItem = new ItineraryItem();
    const { errors } = itineraryItem.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required dateOfEvent', () => {
    const itineraryItem = new ItineraryItem();
    const { errors } = itineraryItem.validateSync();

    expect(errors.dateOfEvent.message).toEqual('Path `dateOfEvent` is required.');
  });

  it('has a required locationOfEvent', () => {
    const itineraryItem = new ItineraryItem();
    const { errors } = itineraryItem.validateSync();

    expect(errors.locationOfEvent.message).toEqual('Path `locationOfEvent` is required.');
  });

  it('has a required weather', () => {
    const itineraryItem = new ItineraryItem();
    const { errors } = itineraryItem.validateSync();

    expect(errors.weather.message).toEqual('Path `weather` is required.');
  });

});
