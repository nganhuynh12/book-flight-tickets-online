const mockFlightModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

const flightService = new (require('../../services/flight.service'))(
  mockFlightModel
);

const mockFlightLists = [
  {
    id: '1',
    startTime: '2023-04-01 14:00:01',
    arriveTime: '2023-04-01 14:00:01',
    numSeat: 80,
    startLocationId: 'dfasdf',
    arriveLocationId: 'dfasdf',
  },
  {
    id: '1',
    startTime: '2023-04-01 14:00:01',
    arriveTime: '2023-04-01 14:00:01',
    numSeat: 80,
    startLocationId: 'dfasdf',
    arriveLocationId: 'dfasdf',
  },
];

describe('Flight Service Test Suite', () => {
  describe('Find all flight method test', () => {
    describe('Given flight list', () => {
      beforeAll(() => {
        mockFlightModel.findAll.mockReturnValue(mockFlightLists);
      });

      it('should return flight list', async () => {
        const flightList = await flightService.findAll();

        expect(flightList).toBeDefined();
      });

      it('should return flight list with length equal to 2', async () => {
        const flightList = await flightService.findAll();

        expect(flightList).toHaveLength(2);
      });
    });

    describe('Given empty flight list', () => {
      beforeAll(() => {
        mockFlightModel.findAll.mockReturnValue([]);
      });

      it('should return flight list', async () => {
        const flightList = await flightService.findAll();

        expect(flightList).toBeDefined();
      });

      it('should return flight list with length equal to 0', async () => {
        const flightList = await flightService.findAll();

        expect(flightList).toHaveLength(0);
      });
    });
  });

  describe('Find flight by PK', () => {
    describe('Given exist flight id', () => {
      beforeAll(() => {
        mockFlightModel.findByPk.mockReturnValue(mockFlightLists[0]);
      });

      it('should return flight with this id', async () => {
        const flight = await flightService.findByPk('1');
        expect(flight).toBeDefined();
      });
    });

    describe('Given non exist id', () => {
      beforeAll(() => {
        mockFlightModel.findByPk.mockReturnValue(null);
      });

      it('should not return any flight', async () => {
        const flight = await flightService.findByPk('3');
        expect(flight).toBe(null);
      });
    });
  });
});
