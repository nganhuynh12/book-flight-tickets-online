const req = require('supertest');
const app = require('../../app');
const locationService = require('../../services/location.service');
jest.mock('../../services/location.service');

describe('Location Controller Test Suite', () => {
  describe('POST /locations', () => {
    describe('Given enough data field', () => {
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

    describe('Given not enough data field', () => {
      it('should response with 400 status code', async () => {
        const res = await req(app).post('/locations');

        expect(res.statusCode).toBe(400);
        expect(res.headers['content-type']).toBe(
          'application/json; charset=utf-8'
        );
      });
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

  describe('DELETE /locations', () => {
    describe('Given location id', () => {
      let mockDeleteMethod;
      beforeAll(() => {
        mockDeleteMethod = jest
          .spyOn(locationService.prototype, 'deleteById')
          .mockImplementation(() => ({
            success: true,
            message: 'delete success',
          }));
      });
      it('should pass location id to service delete method', async () => {
        await req(app).delete('/locations/1');
        expect(mockDeleteMethod).toBeCalled();
        expect(mockDeleteMethod).toBeCalledWith('1');
      });
    });

    describe('Given location id exits in db', () => {
      beforeAll(() => {
        jest
          .spyOn(locationService.prototype, 'deleteById')
          .mockImplementation(() => ({
            success: true,
            message: 'delete success',
          }));
      });

      it('should respone with a 200 status code', async () => {
        const res = await req(app).delete('/locations/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
          success: true,
          message: 'delete success',
        });
      });
    });

    describe('Given location id not exist in db', () => {
      beforeAll(() => {
        jest
          .spyOn(locationService.prototype, 'deleteById')
          .mockImplementation(() => {
            return { success: false, message: 'delete fail' };
          });
      });
      it('should respone with a 200', async () => {
        const res = await req(app).delete('/locations/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
          success: false,
          message: 'delete fail',
        });
      });
    });
  });
});
