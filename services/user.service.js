const User = require('../models/user.model');
const fileService = require('./file.service');

class UserServices {
  async createUser(user, picture) {
    // const { fullName, password, email } = user;
    const fileName = fileService.save(picture);
    const userCreate = await User.create({ ...user, picture: fileName });

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
