const User = require("../models/user");
const Order = require("../models/order");
const { Product } = require("../models/product");

class UserService {
  async addToCart(userId, productId) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1 });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        let cartItem = user.cart.find((item) =>
          item.product._id.equals(product._id)
        );
        cartItem.quantity += 1;
      } else {
        user.cart.push({ product, quantity: 1 });
      }
    }
    
    user = await user.save();
    return user;
  }

  async removeFromCart(userId, productId) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity -= 1;
        }
        break;
      }
    }
    
    user = await user.save();
    return user;
  }

  async saveUserAddress(userId, address) {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    user.address = address;
    user = await user.save();
    return user;
  }

  async createOrder(userId, orderData) {
    const { cart, totalPrice, address } = orderData;
    let products = [];

    // Check product availability and reduce quantity
    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product.quantity >= cart[i].quantity) {
        product.quantity -= cart[i].quantity;
        products.push({ product, quantity: cart[i].quantity });
        await product.save();
      } else {
        throw new Error(`${product.name} is out of stock!`);
      }
    }

    // Clear user cart
    let user = await User.findById(userId);
    user.cart = [];
    user = await user.save();

    // Create order
    let order = new Order({
      products,
      totalPrice,
      address,
      userId: userId,
      orderedAt: new Date().getTime(),
    });
    
    order = await order.save();
    return order;
  }

  async getUserOrders(userId) {
    return await Order.find({ userId });
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }
}

module.exports = new UserService();
