const app = require('../../app');
const req = require('supertest');
const authService = require('../../services/auth.service');
const e = require('express');
jest.mock('../../services/auth.service');

describe('Auth Controller Test Suite', () => {
  describe('GET /auth', () => {
    it('should respone with 200 status code', async () => {
      const res = await req(app).get('/auth');

      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    });
  });

  describe('POST /auth/register', () => {
    describe('Given enough data', () => {
      describe("Given user data don't exists in database", () => {
        beforeAll(() => {
          jest
            .spyOn(authService.prototype, 'register')
            .mockImplementation(() => ({
              success: true,
              message: 'user created',
            }));
        });

        it('should return with 302 status code', async () => {
          const res = await req(app).post('/auth/register').send({
            email: 'test123@gmail.com',
            password: '123456',
          });

          expect(res.statusCode).toBe(302);
          expect(res.headers['content-type']).toBe('text/plain; charset=utf-8');
        });
      });

      describe('given user data that already exists in database', () => {
        beforeAll(() => {
          jest
            .spyOn(authService.prototype, 'register')
            .mockImplementation(() => ({
              success: false,
              message: '',
            }));
        });

        it('should return with a 200 status code', async () => {
          const res = await req(app)
            .post('/auth/register')
            .send({ email: 'test@gmail.com', password: '123456' });
          expect(res.statusCode).toBe(200);
        });
      });
    });

    describe('given not enough data', () => {
      it('should return with a 400 status code', () => {
        [({ email: 'test@gmail.com' }, { password: '123456' })].forEach(
          async (mockData) => {
            const res = await req(app).post('/auth/register').send(mockData);
            expect(res.statusCode).toBe(400);
          }
        );
      });
    });

    describe('given data in wrong format', () => {
      [
        { email: 'test@gmail', password: '123456' },
        { email: 'test@gmail.com', password: '12345' },
        { email: 'test@gmail.com', password: '1234567891011121314151617' },
      ].forEach((mockData) => {
        it('should return with a 400 status code', async () => {
          const res = await req(app).post('/auth/register').send(mockData);

          expect(res.statusCode).toBe(400);
          expect(res).toBeDefined();
        });
      });
    });
  });
});
