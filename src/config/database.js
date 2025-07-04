const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = process.env.MONGODB_URI;
    await mongoose.connect(DB);
    console.log("Database connection successful");
    console.log(`Connected to: ${DB}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };