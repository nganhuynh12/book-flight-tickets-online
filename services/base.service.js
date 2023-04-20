class baseService {
  static baseAddress = 'localhost:3000';

  constructor(model, pathName) {
    this.model = model;
    this.pathName = pathName;
  }

  async findAll(
    { page, per_page, where } = {
      page: undefined,
      per_page: undefined,
      where: undefined,
    }
  ) {
    if (page !== undefined && per_page !== undefined) {
      const offset = (page - 1) * per_page;
      const limit = per_page;
      console.log(offset, limit);

      const res = await this.model.findAndCountAll({
        offset,
        limit,
      });

      res.page_count = Number.parseInt(Math.ceil(res.count / limit));

      if (page > 1) {
        res.prev_page_url = `${baseService.baseAddress}/${this.pathName}?page=${
          page - 1
        }&per_page=${per_page}`;
      } else {
        res.prev_page_url = null;
      }

      if (page < res.page_count) {
        res.next_page_url = `${baseService.baseAddress}/${this.pathName}?page=${
          page + 1
        }&per_page=${per_page}`;
      } else {
        res.next_page_url = null;
      }

      return res;
    } else {
      return await this.model.findAll({ where });
    }
  }

  async findByPk(pk) {
    return await this.model.findByPk(pk);
  }

  async deleteById(id) {
    let success, message;

    const res = await this.model.destroy({ where: { id } });
    if (res > 0) {
      success = true;
      message = 'delete success';
    } else {
      success = false;
      message = 'delete fail';
    }

    return { success, message };
  }

  async add(row) {
    try {
      const result = await this.model.create(row);
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, row) {
    try {
      let success, message;
      const result = await this.model.update(row, { where: { id } });
      if (result > 0) {
        success = true;
        message = 'update success';
      } else {
        success = false;
        message = 'update fail';
      }

      return {
        success,
        message,
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = baseService;
