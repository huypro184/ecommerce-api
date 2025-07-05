const { Product } = require("../models/product");
const Order = require("../models/order");

class AdminService {
  async addProduct(productData) {
    const { name, description, images, quantity, price, category } = productData;
    
    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
    });
    
    product = await product.save();
    return product;
  }

  async getAllProducts() {
    return await Product.find({});
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
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

  async getAnalytics() {
    const orders = await Order.find({});
    let totalEarnings = 0;

    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].products.length; j++) {
        totalEarnings +=
          orders[i].products[j].quantity * orders[i].products[j].product.price;
      }
    }

    // Category wise earnings
    const mobileEarnings = await this.fetchCategoryWiseProduct("Mobiles");
    const essentialEarnings = await this.fetchCategoryWiseProduct("Essentials");
    const applianceEarnings = await this.fetchCategoryWiseProduct("Appliances");
    const booksEarnings = await this.fetchCategoryWiseProduct("Books");
    const fashionEarnings = await this.fetchCategoryWiseProduct("Fashion");

    return {
      totalEarnings,
      mobileEarnings,
      essentialEarnings,
      applianceEarnings,
      booksEarnings,
      fashionEarnings,
    };
  }

  async fetchCategoryWiseProduct(category) {
    let earnings = 0;
    let categoryOrders = await Order.find({
      "products.product.category": category,
    });

    for (let i = 0; i < categoryOrders.length; i++) {
      for (let j = 0; j < categoryOrders[i].products.length; j++) {
        earnings +=
          categoryOrders[i].products[j].quantity *
          categoryOrders[i].products[j].product.price;
      }
    }
    return earnings;
  }
}

module.exports = new AdminService();
