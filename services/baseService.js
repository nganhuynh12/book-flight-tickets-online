class baseService {
  constructor(repository) {
    this.repository = repository;
  }

  async find(options) {
    return await this.repository.find(options);
  }

  async findById() {
    return await this.repository.findById();
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async add(row) {
    return await this.repository.save(row);
  }
}

module.exports = baseService;
