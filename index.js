// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api", employeeRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5555, () => console.log("Server running on port 5555"));
  })
  .catch((error) => console.log(error));
