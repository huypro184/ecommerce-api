const authService = require("../services/authService");

class AuthController {
  async signup(req, res) {
    try {
      const user = await authService.registerUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser(email, password);
      res.json({ token: result.token, ...result.user._doc });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async tokenIsValid(req, res) {
    try {
      const token = req.header("x-auth-token");
      const isValid = await authService.validateToken(token);
      res.json(isValid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await authService.getUserById(req.user);
      res.json({ ...user._doc, token: req.token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
