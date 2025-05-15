const authService = require('../services/auth.service');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, userName } = req.body;

      const data = await authService.register(email, password, userName);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const data = await authService.forgotPassword(email);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
