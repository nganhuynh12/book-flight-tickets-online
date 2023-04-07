const req = require('supertest');
const app = require('../../app');
const ticketService = require('../../services/ticket.service');
const mockTicketList = require('../mocks/data').mockTicketList;
jest.mock('../../services/ticket.service');

describe('Ticket Controller Test Suite', () => {
  describe('POST /tickets', () => {
    describe('Given a valid ticket object', () => {
      it('should return the create ticket object', async () => {
        const res = await req(app).post('/tickets').send(mockTicketList[0]);

        expect(res.statusCode).toBe(201);
      });
    });

    describe('Given a invalid ticket object', () => {
      it('should return the errors', async () => {
        let temp = { ...mockTicketList[0] };
        delete temp.userId;
        const res = await req(app).post('/tickets').send(temp);

        expect(res.statusCode).toBe(400);
      });
    });
  });

  describe('GET tickets', () => {
    describe('Given ticket list', () => {
      it('should return given ticket list', async () => {
        const res = await req(app).get('/tickets');

        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe('DELETE /tickets', () => {
    describe('Given exists ticket id', () => {
      beforeAll(() => {
        jest
          .spyOn(ticketService.prototype, 'deleteById')
          .mockImplementation(() => ({}));
      });
    });
  });
});
