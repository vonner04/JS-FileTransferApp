const jwt = require("jsonwebtoken");

const errorResponses = {
	TokenExpiredError: { status: 401, message: "Token expired. Please log in again." },
	JsonWebTokenError: { status: 401, message: "Invalid token. Please log in again." },
};

const isAuthenticated = (req, res, next) => {
	try {
		const token = req.header("Authorization");
		if (!token) {
			return res.status(401).json({ message: "Access denied" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		const response = errorResponses[err.name] || { status: 500, message: "Internal Server Error" };
		console.error("Auth Error: ", err);
		return res.status(response.status).json({ message: response.message });
	}
};

module.exports = isAuthenticated;
