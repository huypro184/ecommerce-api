const express = require("express");
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");

const productRouter = express.Router();

// GET /api/products
productRouter.get("/products", productController.getProducts);

// GET /api/products/search
productRouter.get("/products/search", productController.searchProducts);

// GET /api/products/:id
productRouter.get("/products/:id", productController.getProduct);

// GET /api/products/category/:category  
productRouter.get("/products/category/:category", productController.getProductsByCategory);

module.exports = productRouter;