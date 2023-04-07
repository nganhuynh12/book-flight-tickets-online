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
    describe('When given location list and page and per_page param', () => {
      beforeAll(() => {
        mockLocationModel.findAndCountAll.mockReturnValueOnce({
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
        expect(mockLocationModel.findAndCountAll).toHaveBeenCalledTimes(1);
        expect(mockLocationModel.findAll).not.toHaveBeenCalled();
      });
    });

    describe('When given location list', () => {
      beforeAll(() => {
        mockLocationModel.findAll.mockReturnValue(mockLocationList);
        mockLocationModel.findAndCountAll.mockClear();
      });

      it('Should return location list', async () => {
        const res = await locationService.findAll();

        expect(res).toMatchObject(mockLocationList);
        expect(mockLocationModel.findAll).toHaveBeenCalledTimes(1);
        expect(mockLocationModel.findAndCountAll).not.toHaveBeenCalled();
      });
    });
  });

  describe('Find location by id method test', () => {
    describe('When given exist id', () => {
      beforeAll(() => {
        mockLocationModel.findByPk.mockReturnValue(mockLocationList[0]);
      });

      it('should return the location with id equal to that id', async () => {
        const res = await locationService.findByPk('fake id');

        expect(res).toMatchObject(mockLocationList[0]);
        expect(mockLocationModel.findByPk).toHaveBeenCalledTimes(1);
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
        expect(mockLocationModel.destroy).toBeCalledTimes(1);
        expect(mockLocationModel.destroy).toBeCalledWith({
          where: { id: '2' },
        });
      });
    });

    describe('Given id not exist in db', () => {
      beforeAll(() => {
        mockLocationModel.destroy.mockClear();
        mockLocationModel.destroy.mockReturnValue(0);
      });

      it('should return object has success equal to false', async () => {
        const res = await locationService.deleteById('2');

        expect(res).toMatchObject({
          success: false,
          message: 'delete fail',
        });
        expect(mockLocationModel.destroy).toBeCalledTimes(1);
        expect(mockLocationModel.destroy).toBeCalledWith({
          where: { id: '2' },
        });
      });
    });
  });

  describe('Add location method test', () => {
    describe('When given location data', () => {
      beforeAll(() => {
        mockLocationModel.create.mockReturnValueOnce(mockLocationList[0]);
      });

      it('Should return created location', async () => {
        const res = await locationService.add(mockLocationList[0]);

        expect(res).toMatchObject(mockLocationList[0]);
        expect(mockLocationModel.create).toBeCalledTimes(1);
        expect(mockLocationModel.create).toBeCalledWith(mockLocationList[0]);
      });
    });
  });

  describe('Update location method test', () => {
    describe('When given exist id', () => {
      beforeAll(() => {
        mockLocationModel.update.mockClear();
        mockLocationModel.update.mockReturnValueOnce(1);
      });

      it('should return object with success property equal to true', async () => {
        const res = await locationService.updateById('1', mockLocationList[0]);

        expect(res).toMatchObject({ success: true });
        expect(mockLocationModel.update).toBeCalledTimes(1);
        expect(mockLocationModel.update).toBeCalledWith(mockLocationList[0], {
          where: { id: '1' },
        });
      });
    });

    describe('Given non exist id', () => {
      beforeAll(() => {
        mockLocationModel.update.mockClear();
        mockLocationModel.update.mockReturnValueOnce(0);
      });

      it('should return object with success property equal to false', async () => {
        const res = await locationService.updateById('1', mockLocationList[0]);

        expect(res).toMatchObject({ success: false });
        expect(mockLocationModel.update).toBeCalledTimes(1);
        expect(mockLocationModel.update).toBeCalledWith(mockLocationList[0], {
          where: { id: '1' },
        });
      });
    });
  });
});
