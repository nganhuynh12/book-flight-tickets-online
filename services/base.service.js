class baseService {
  constructor(model) {
    this.model = model;
  }

  async findAll(options) {
    return await this.model.findAll(options);
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
