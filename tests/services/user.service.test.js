const mockUserModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

const userService = new (require('../../services/user.service'))(mockUserModel);

const mockUserList = [
  {
    email: 'test@gmail.com',
    password: 'dfavsdvsdarwev',
    username: 'test',
    gender: true,
    phone: '0123234235',
    address: 'fdsavscavfhsdaf',
  },
  {
    email: 'test@gmail.com',
    password: 'dfavsdvsdarwev',
    username: 'test',
    gender: true,
    phone: '0123234235',
    address: 'fdsavscavfhsdaf',
  },
];

describe('User Service Test Suite', () => {
  describe('Find all user method test', () => {
    describe('Given user list', () => {
      beforeAll(() => {
        mockUserModel.findAll.mockReturnValue(mockUserList);
      });

      it('should return user list', async () => {
        const res = await userService.findAll();

        expect(res).toBeDefined();
        expect(res).toHaveLength(2);
      });
    });

    describe('Given empty list', () => {
      beforeAll(() => {
        mockUserModel.findAll.mockReturnValue([]);
      });

      it('should return user list', async () => {
        const res = await userService.findAll();

        expect(res).toBeDefined();
        expect(res).toHaveLength(0);
      });
    });
  });

  describe('Find user by PK', () => {
    describe('Given exist user id', () => {
      beforeAll(() => {
        mockUserModel.findByPk.mockReturnValueOnce(mockUserList[0]);
      });
      it('should return user with that id', async () => {
        const res = await userService.findByPk('1');

        expect(res).not.toBe(null);
      });
    });

    describe('Given non exist user id', () => {
      beforeAll(() => {
        mockUserModel.findByPk.mockReturnValueOnce(null);
      });

      it('should not return any user', async () => {
        const res = await userService.findByPk('1');

        expect(res).toBe(null);
      });
    });
  });

  describe('Delete user method test', () => {
    describe('Given exist user id', () => {
      beforeAll(() => {
        mockUserModel.destroy.mockReturnValueOnce(1);
      });
      it('should return result with success equal to true', async () => {
        const res = await userService.deleteById('1');

        expect(res.success).toBe(true);
      });
    });

    describe('Given non exist user id', () => {
      beforeAll(() => {
        mockUserModel.destroy.mockReturnValueOnce(null);
      });

      it('should return result with success equal to false', async () => {
        const res = await userService.deleteById('1');

        expect(res.success).toBe(false);
      });
    });
  });
});
