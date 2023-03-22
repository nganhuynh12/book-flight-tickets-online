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
    return await this.model.create(row);
  }

  async updateById(id, row) {
    return await this.model.update(row, { where: { id } });
  }
}

module.exports = baseService;
