const User = require('../models/user.model');

class UserController {
  async get(req, res) {
    try {
      const getAllUser = await User.find();
      res.status(200).send(getAllUser);
    } catch (error) {
      res.status(500).send(`This is Error -- ${error}`);
    }
  }

  async create(req, res) {
    try {
      const { fullName, password, email } = req.body;
      const user = await User.create({ fullName, password, email });
      res.status(201).send(user);
    } catch (error) {
      res.status(501).send(`This is Error -- ${error}`);
    }
  }
}

module.exports = new UserController();
