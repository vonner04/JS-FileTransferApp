require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const corsOptions = {
	origin: "http://localhost:5173", //Edit if you want to allow other origins
	credentials: true, //Not sure what this does yet.
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("Yozah");
});

//Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Failed to connect to MongoDB: ", err));

const server = app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server is running on port ${server.address().port}`);
});
