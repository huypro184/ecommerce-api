const userService = require("../services/userService");

class UserController {
  async addToCart(req, res) {
    try {
      const { product } = req.body;
      const user = await userService.addToCart(req.user, product);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async removeFromCart(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.removeFromCart(req.user, id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveUserAddress(req, res) {
    try {
      const { address } = req.body;
      const user = await userService.saveUserAddress(req.user, address);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createOrder(req, res) {
    try {
      const order = await userService.createOrder(req.user, req.body);
      res.json(order);
    } catch (error) {
      if (error.message.includes("out of stock")) {
        return res.status(400).json({ msg: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getUserOrders(req, res) {
    try {
      const orders = await userService.getUserOrders(req.user);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();