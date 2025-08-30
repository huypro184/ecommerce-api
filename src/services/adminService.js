const { Product } = require("../models/product");
const Order = require("../models/order");

class AdminService {
  async addProduct(productData) {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      throw new Error(`Failed to add product: ${error.message}`);
    }
  }

  async getAllProducts(options) {
    return await productService.getAllProducts(options);
  }

  async updateProduct(id, updateData) {
    return await productService.updateProduct(id, updateData);
  }

  async deleteProduct(id) {
    // Check if product is in any pending orders
    const ordersWithProduct = await Order.countDocuments({
      "products.product": id,
      status: { $in: ["pending", "processing"] }
    });

    if (ordersWithProduct > 0) {
      throw new Error("Cannot delete product with pending orders");
    }

    return await productService.deleteProduct(id);
  }

  async getAllOrders() {
    return await Order.find({});
  }

  async changeOrderStatus(id, status) {
    let order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    
    order.status = status;
    order = await order.save();
    return order;
  }
}

module.exports = new AdminService();
