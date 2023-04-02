const { baseAddress } = require('./base.service');

class baseService {
  static baseAddress = 'localhost:3000';

  constructor(model, pathName) {
    this.model = model;
    this.pathName = pathName;
  }

  async findAll({ page, per_page }) {
    if (page && per_page) {
      const offset = (page - 1) * per_page;
      const limit = per_page;

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
    }
    return await this.model.findAll();
  }

  async findByPk(pk) {
    return await this.model.findByPk(pk);
  }

  async deleteById(id) {
    return await this.model.destroy({ where: { id } });
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
      const result = await this.model.update(row, { where: { id } });
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = baseService;
