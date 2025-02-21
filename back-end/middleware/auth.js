const jwt = require("jsonwebtoken");

const errorResponses = {
	TokenExpiredError: { status: 401, message: "Token expired. Please log in again." },
	JsonWebTokenError: { status: 403, message: "Invalid token. Authentication failed." },
	NotBeforeError: { status: 403, message: "Token is not valid yet." },
};

const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.header("Authorization");
		if (!authHeader) return res.status(401).json({ message: "Access denied. No token provided." });

		const tokenParts = authHeader.split(" ");
		if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
			return res.status(400).json({ message: "Malformed token. Use format: Bearer <token>" });
		}

		const token = tokenParts[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		const response = errorResponses[err.name] || { status: 500, message: "Internal Server Error" };
		console.error("Auth Error:", err.message);
		return res.status(response.status).json({ message: response.message });
	}
};

module.exports = verifyToken;
