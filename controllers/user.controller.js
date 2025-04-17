const User = require('../models/user.model');
const userService = require('../services/user.service');

class UserController {
  async get(req, res) {
    try {
      const getUsers = await userService.getAllUsers();
      res.status(200).send(getUsers);
    } catch (error) {
      res.status(500).send(`This is Error -- ${error}`);
    }
  }

  async create(req, res) {
    try {
      const createUser = await userService.createUser(req.body);
      res.status(201).send(createUser);
    } catch (error) {
      res.status(501).send(`This is Error -- ${error}`);
    }
  }

  async delete(req, res) {
    try {
      const deleteUser = await userService.deleteUser(req.params.id);
      res.status(200).send(deleteUser);
    } catch (error) {
      res.status(501).send(`This is Error -- ${error}`);
    }
  }

  async update(req, res) {
    try {
      const updateUser = await userService.updateUser(req.params.id, req.body);
      res.status(200).send(updateUser);
    } catch (error) {
      res.status(501).send(`This is Error -- ${error}`);
    }
  }
}

module.exports = new UserController();
