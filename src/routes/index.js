const express = require("express");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "E-commerce API is running!" });
});

// Mount routes with proper prefixes
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/", productRoutes);
router.use("/", userRoutes);

module.exports = router;