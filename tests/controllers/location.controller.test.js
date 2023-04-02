const req = require('supertest');
const app = require('../../app');
jest.mock('../../services/location.service');

describe('Location Controller Test Suite', () => {
  describe('POST /locations', () => {
    it('should respone with a 201 status code', async () => {
      const res = await req(app).post('/locations').send({
        value: 'TP.HCM',
      });

      expect(res.statusCode).toBe(201);
      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });
  });

  describe('GET /locations', () => {
    it('should respone with a 200 status code', async () => {
      const res = await req(app).get('/locations');

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });
  });
});
