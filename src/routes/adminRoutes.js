const express = require("express");
const adminController = require("../controllers/adminController");
const admin = require("../middlewares/admin");

const adminRouter = express.Router();

// POST /api/admin/add-product
adminRouter.post("/add-product", admin, adminController.addProduct);

// GET /api/admin/get-products
adminRouter.get("/get-products", admin, adminController.getProducts);

// POST /api/admin/delete-product
adminRouter.post("/delete-product", admin, adminController.deleteProduct);

// GET /api/admin/get-orders
adminRouter.get("/get-orders", admin, adminController.getOrders);

// POST /api/admin/change-order-status
adminRouter.post("/change-order-status", admin, adminController.changeOrderStatus);

// GET /api/admin/analytics
adminRouter.get("/analytics", admin, adminController.getAnalytics);

module.exports = adminRouter;