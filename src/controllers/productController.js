const productService = require("../services/productService");

class ProductController {
  async addProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.body;
      const product = await productService.deleteProduct(id);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await productService.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchProducts(req, res) {
    try {
      const { q } = req.query;
      const products = await productService.searchProducts(q);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();
