require("dotenv").config();

// Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Routes import
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS Configuration
const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true, // Allows credentials (cookies, authorization headers)
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Failed to connect to MongoDB: ", err));

// Export app for testing
module.exports = app;
