const app = require("./app");

const PORT = process.env.SERVER_PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = server; // Export the server in case we need to close it in tests
