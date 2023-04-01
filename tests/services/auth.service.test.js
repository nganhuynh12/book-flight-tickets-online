const user = { email: 'test@gmail.com', password: '123456' };

const mockAuthModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const authService = new (require('../../services/auth.service'))(mockAuthModel);

describe('Auth Service Test Suite', () => {
  describe('register method test', () => {
    test('given exist email', async () => {
      mockAuthModel.findOne.mockReturnValueOnce(user);

      const res = await authService.register(user);
      expect(res).toMatchObject({
        success: false,
        message: 'Already use email',
      });
    });

    test("given doesn't exist email", async () => {
      mockAuthModel.findOne.mockReturnValueOnce(null);
      mockAuthModel.create.mockReturnValueOnce(user);

      const res = await authService.register(user);
      expect(res).toMatchObject({
        success: true,
        message: 'User created',
      });
    });
  });
});
