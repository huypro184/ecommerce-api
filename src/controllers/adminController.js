const adminService = require("../services/adminService");

class AdminController {
  async addProduct(req, res) {
    try {
      const product = await adminService.addProduct(req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await adminService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.body;
      const product = await adminService.deleteProduct(id);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await adminService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async changeOrderStatus(req, res) {
    try {
      const { id, status } = req.body;
      const order = await adminService.changeOrderStatus(id, status);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAnalytics(req, res) {
    try {
      const analytics = await adminService.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AdminController();
