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

const mockFlightList = [
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
    describe('When given flight list', () => {
      beforeAll(() => {
        mockFlightModel.findAll.mockReturnValue(mockFlightList);
      });

      it('Should return flight list', async () => {
        const res = await flightService.findAll();

        expect(res).toBeDefined();
      });

      it('Should return flight list with length equal to 2', async () => {
        const res = await flightService.findAll();

        expect(res).toHaveLength(2);
      });

      it('Should return flight list match special shape', async () => {
        const res = await flightService.findAll();

        expect(res[0]).toMatchObject(mockFlightList[0]);
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
        mockFlightModel.findByPk.mockReturnValue(mockFlightList[0]);
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

  describe('Create flight method test', () => {
    describe('given flight object', () => {
      it('should return back flight object', async () => {
        mockFlightModel.create.mockReturnValue(mockFlightList[0]);

        const flight = await flightService.add(mockFlightList[0]);
        expect(flight).toMatchObject(mockFlightList[0]);
      });
    });
  });
});
