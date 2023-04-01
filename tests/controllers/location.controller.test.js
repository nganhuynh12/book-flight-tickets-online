const req = require('supertest');
const app = require('../../app');

describe('Location Controller Test Suite', () => {
  describe('POST /location', () => {
    describe('given all value', () => {
      test('should resond with a 201 status code', async () => {
        const res = await req(app).post('/locations').send({
          value: 'TP.HCM',
        });
        console.log(res.body);
        expect(res.statusCode).toBe(201);
      });
    });
  });
});
