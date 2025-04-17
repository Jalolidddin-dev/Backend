const User = require('../models/user.model');

class UserServices {
  async createUser(user) {
    const { fullName, password, email } = user;
    const userCreate = await User.create({ fullName, password, email });

    return userCreate;
  }

  async getAllUsers() {
    const getUsers = await User.find();
    return getUsers;
  }

  async deleteUser(id) {
    const userDeleted = await User.findByIdAndDelete(id);

    return userDeleted;
  }

  async updateUser(id, user) {
    const { fullName, password, email } = user;
    const userUpdated = await User.findByIdAndUpdate(id, {
      fullName,
      password,
      email,
    });
    return userUpdated;
  }
}

module.exports = new UserServices();
