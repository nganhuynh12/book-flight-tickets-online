const mockTicketModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAndCountAll: jest.fn(),
};

const ticketService = new (require('../../services/ticket.service'))(
  mockTicketModel
);

const mockTicketList = [
  {
    type: 0,
    price: 20000,
    seatId: 1,
    luggageType: 1,
  },
  {
    type: 0,
    price: 20000,
    seatId: 1,
    luggageType: 1,
  },
];

describe('Ticket Service Test Suite', () => {
  describe('Find all ticket method test', () => {
    describe('Given ticket list, page and per_page param', () => {
      beforeAll(() => {
        mockTicketModel.findAndCountAll.mockReturnValueOnce({
          count: 1,
          rows: mockTicketList,
        });
      });

      it('should return ticket list with pagination', async () => {
        const res = await ticketService.findAll({ page: 1, per_page: 2 });

        expect(res).toMatchObject({
          count: 1,
          rows: mockTicketList,
          page_count: 1,
        });
        expect(Object.keys(res).length).toEqual(5);
        expect(mockTicketModel.findAndCountAll).toHaveBeenCalled();
        expect(mockTicketModel.findAll).not.toHaveBeenCalled();
      });
    });
  });
});
