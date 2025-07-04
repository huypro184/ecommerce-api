const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

class AuthService {
  async registerUser(userData) {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with same email already exists!");
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    
    user = await user.save();
    return user;
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with this email does not exist!");
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return { token, user };
  }

  async validateToken(token) {
    if (!token) return false;
    
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return false;

      const user = await User.findById(verified.id);
      if (!user) return false;
      
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }
}

module.exports = new AuthService();