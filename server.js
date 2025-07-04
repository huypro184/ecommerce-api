require('dotenv').config();

const express = require("express");
const { connectDB } = require("./src/config/database");
const routes = require("./src/routes");

const PORT = process.env.PORT || 3000;
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});