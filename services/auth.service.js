const User = require('../models/user.model');

class AuthService {
  async register(email, password, userName) {
    const existUser = await User.fineOne({ email });
    if (existUser) {
      throw new Error('User already exists');
    }

    const user = await User.create({ email, password, userName });
    return user;
  }

  async login(email, password) {
    const user = User.findById({ email });
    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }

  async forgotPassword(email) {
    if (!email) {
      throw new Error('Email not provided');
    }

    return 200;
  }
}

module.exports = new AuthService();
