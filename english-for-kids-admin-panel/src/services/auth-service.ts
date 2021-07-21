const AdminModel = require('../models/admin-model');

class AuthService {

  async findOne(login: string) {
    return AdminModel.findOne({ login });
  }
}

module.exports = new AuthService();
