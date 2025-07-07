const { Product } = require("../models/product");

class ProductService {
  async createProduct(productData) {
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

  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProduct(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }

  async getProductsByCategory(category) {
    return await Product.find({ category });
  }

  async searchProducts(query) {
    return await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });
  }
}

module.exports = new ProductService();
