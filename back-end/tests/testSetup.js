/**
 * A setup file for Jest to connect to MongoDB before running tests
 * and disconnect after all tests are done.
 * Without this file, Jest will run all tests simultaneously and
 * will not terminate the test script properly, making the terminal hang.
 */
const mongoose = require("mongoose");

beforeAll(async () => {
	jest.setTimeout(30000); // ✅ Avoid timeouts
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
});

afterAll(async () => {
	await mongoose.connection.close(); // ✅ Closes DB properly
	console.log("MongoDB connection closed"); // ✅ Debugging
});
