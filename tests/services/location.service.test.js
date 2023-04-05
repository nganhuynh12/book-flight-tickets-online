const mockLocationList = [{ value: 'TP.HCM' }, { value: 'Thủ đô Hà Nội' }];

const mockLocationModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAndCountAll: jest.fn(),
};

const locationService = new (require('../../services/location.service'))(
  mockLocationModel
);

describe('Location Service Test Suite', () => {
  describe('Find all location method test', () => {
    describe('Given location list and page and per_page param', () => {
      beforeAll(() => {
        mockLocationModel.findAndCountAll.mockReturnValue({
          count: 1,
          rows: mockLocationList,
        });
      });

      it('should return location list with pagination', async () => {
        const res = await locationService.findAll({ page: 1, per_page: 3 });

        expect(res).toMatchObject({
          count: 1,
          rows: mockLocationList,
          page_count: 1,
        });
        expect(Object.keys(res).length).toEqual(5);
        expect(mockLocationModel.findAndCountAll).toHaveBeenCalled();
        expect(mockLocationModel.findAll).not.toHaveBeenCalled();
      });
    });

    describe('given location list', () => {
      beforeAll(() => {
        mockLocationModel.findAll.mockReturnValue(mockLocationList);
        mockLocationModel.findAndCountAll.mockClear();
      });

      it('should return location list', async () => {
        const res = await locationService.findAll();

        expect(res).toBeDefined();
        expect(mockLocationModel.findAll).toHaveBeenCalled();
        expect(mockLocationModel.findAndCountAll).not.toHaveBeenCalled();
      });
    });
  });

  describe('Find location by id method test', () => {
    describe('Given id exist in db', () => {
      beforeAll(() => {
        mockLocationModel.findByPk.mockReturnValue(mockLocationList[0]);
      });

      it('should return the location with id equal to that id', async () => {
        const res = await locationService.findByPk('fake id');

        expect(res).toBeDefined();
        expect(mockLocationModel.findByPk).toHaveBeenCalled();
      });
    });

    describe('Given id not exist in db', () => {
      beforeAll(() => {
        mockLocationModel.findByPk.mockReturnValue(null);
      });

      it('should return null', async () => {
        const res = await locationService.findByPk('1');

        expect(res).toBe(null);
      });
    });
  });

  describe('Delete location method test', () => {
    describe('Given id exist in db', () => {
      beforeAll(() => {
        mockLocationModel.destroy.mockReturnValue(1);
      });

      it('should return object has success equal to true', async () => {
        const res = await locationService.deleteById('2');

        expect(res).toMatchObject({ success: true, message: 'delete success' });
      });
    });

    describe('Given id not exist in db', () => {
      beforeAll(() => {
        mockLocationModel.destroy.mockReturnValue(0);
      });

      it('should return object has success equal to false', async () => {
        const res = await locationService.deleteById('2');

        expect(res).toMatchObject({
          success: false,
          message: 'delete fail',
        });
      });
    });
  });

  describe('Add location method test', () => {
    describe('given location data', () => {
      beforeAll(() => {
        mockLocationModel.create.mockReturnValueOnce(mockLocationList[0]);
      });

      it('should return created location', async () => {
        const res = await locationService.add(mockLocationList[0]);

        expect(res).toMatchObject(mockLocationList[0]);
      });
    });
  });
});
