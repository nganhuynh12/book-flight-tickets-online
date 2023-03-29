const db = require('../../models');
const { flightService } = require('../../services');

describe('Flight Service Test Suite', () => {
  beforeAll(async () => {
    await db.sequelize.sync();
  });

  it('should return all flight', async () => {
    const allFlights = await flightService.findAll();
    expect(allFlights[0]).toMatchObject();
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
