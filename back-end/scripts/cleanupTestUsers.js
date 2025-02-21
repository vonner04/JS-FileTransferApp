require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

mongoose
	.connect(process.env.MONGO_URI)
	.then(async () => {
		const result = await User.deleteMany({ email: { $regex: /@test.com$/ } });
		console.log(`Deleted ${result.deletedCount} test users.`);
		mongoose.connection.close();
	})
	.catch((err) => console.error("Failed to clean up test data:", err));
