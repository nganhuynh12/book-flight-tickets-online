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

const mockTicketList = require('../mocks/data').mockTicketList;

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

  describe('Delete ticket method test', () => {
    describe('Given exist ticket id', () => {
      beforeAll(() => {
        mockTicketModel.destroy.mockReturnValueOnce(1);
      });

      it('should return object success equal to true', async () => {
        const res = await ticketService.deleteById('1');

        expect(res).toMatchObject({
          success: true,
        });
        expect(mockTicketModel.destroy).toBeCalledTimes(1);
        expect(mockTicketModel.destroy).toBeCalledWith({ where: { id: '1' } });
      });
    });

    describe('Given non exits ticket id', () => {
      beforeAll(() => {
        mockTicketModel.destroy.mockClear();
        mockTicketModel.destroy.mockReturnValueOnce(0);
      });

      it('should return object with success prop equal to false', async () => {
        const res = await ticketService.deleteById('1');

        expect(res).toMatchObject({
          success: false,
        });
        expect(mockTicketModel.destroy).toBeCalledTimes(1);
        expect(mockTicketModel.destroy).toBeCalledWith({ where: { id: '1' } });
      });
    });
  });
});
