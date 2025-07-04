const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

const authRouter = express.Router();

// POST /api/auth/signup
authRouter.post("/signup", authController.signup);

// POST /api/auth/signin
authRouter.post("/signin", authController.signin);

// POST /api/auth/tokenIsValid
authRouter.post("/tokenIsValid", authController.tokenIsValid);

// GET /api/auth/ (with auth middleware)
authRouter.get("/", auth, authController.getUser);

module.exports = authRouter;