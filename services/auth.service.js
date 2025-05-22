const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class AuthService {
  async register(email, password, userName) {
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw new Error('User already exists');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashPassword, userName });
    return user;
  }

  async login(email, password) {
    const user = User.findOne({ email });

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new Error('Password is incorrect');
    }

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

  async logout(email) {
    return await User.findOneAndDelete(email);
  }
}

module.exports = new AuthService();
