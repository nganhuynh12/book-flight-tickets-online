const req = require('supertest');
const app = require('../../app');
const flightService = require('../../services/flight.service');
const { mockFlightLists } = require('../mocks/data');
const { escape } = require('grunt');
jest.mock('../../services/flight.service');

describe('Flight Controller Test Suite', () => {
  describe('POST /flights', () => {
    describe('Given enough data field', () => {
      it('should respone with a 201 status code', async () => {
        const res = await req(app).post('/flights').send(mockFlightLists[0]);

        expect(res.statusCode).toBe(201);
        expect(res.headers['content-type']).toBe(
          'application/json; charset=utf-8'
        );
      });
    });

    describe('Given not enought data field', () => {
      it('should respone with 400 status code', async () => {
        const res = await req(app).post('/flights').send({ numSeat: 80 });

        expect(res.statusCode).toEqual(400);
        expect(res.headers['content-type']).toBe(
          'application/json; charset=utf-8'
        );
      });
    });
  });

  describe('GET /flights', () => {
    describe('Given flight list', () => {
      it('should return flight list', async () => {
        const res = await req(app).get('/flights');

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toBe(
          'application/json; charset=utf-8'
        );
      });
    });
  });
});
