const req = require('supertest');
const app = require('../../app');
const mockUserList = require('../mocks/data').mockUserList;
const userService = require('../../services/user.service');
jest.mock('../../services/user.service');

describe('User Controller Test Suite', () => {
  describe('GET /users', () => {
    describe('Given user list', () => {
      let mockFunc;
      beforeEach(() => {
        mockFunc = jest
          .spyOn(userService.prototype, 'findAll')
          .mockReturnValue(mockUserList);
        mockFunc.mockClear();
      });

      it('should return 200 status code', async () => {
        const res = await req(app).get('/users');

        expect(res.statusCode).toBe(200);
      });

      it('should return user list', async () => {
        const res = await req(app).get('/users');

        expect(res.body).toHaveLength(2);
        expect(Array.isArray(res.body)).toBeTruthy();
      });

      it('should call user service findall 1 time', async () => {
        const res = await req(app).get('/users');

        expect(mockFunc).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('GET /users/:id', () => {
    describe('Given id exits', () => {
      let mockFunc;
      beforeEach(() => {
        mockFunc = jest
          .spyOn(userService.prototype, 'findByPk')
          .mockReturnValue(mockUserList[0]);
        mockFunc.mockClear();
      });

      it('Should return correct format response', async () => {
        const res = await req(app).get('/users/1');

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toBe(
          'application/json; charset=utf-8'
        );
      });

      it('Should return user with that id', async () => {
        const res = await req(app).get('/users/1');

        expect(res.body).toMatchObject(mockUserList[0]);
      });

      it('Should call user service find by pk method 1 time', async () => {
        const res = await req(app).get('users/1');

        expect(mockFunc).toHaveBeenCalledTimes(1);
      });
    });
  });
});
