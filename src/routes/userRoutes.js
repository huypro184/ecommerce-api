const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

// POST /api/add-to-cart
userRouter.post("/add-to-cart", auth, userController.addToCart);

// DELETE /api/remove-from-cart/:id
userRouter.delete("/remove-from-cart/:id", auth, userController.removeFromCart);

// GET /api/profile
userRouter.get("/profile", auth, userController.getProfile);

// POST /api/save-user-address
userRouter.post("/save-user-address", auth, userController.saveUserAddress);

// POST /api/order
userRouter.post("/order", auth, userController.createOrder);

// GET /api/orders/me
userRouter.get("/orders/me", auth, userController.getUserOrders);

module.exports = userRouter;