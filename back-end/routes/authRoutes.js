const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

const generateAccessToken = (user) => {
	return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
const generateRefreshToken = (user) => {
	return jwt.sign({}, process.env.REFRESH_TOKEN_SECRET);
};

/**
 * @route POST /api/auth/register
 * @desc Registers a new user
 * @access Public
 *
 * @params email, password
 */
router.post("/register", async (req, res) => {
	try {
		const { email, password } = req.body;

		//Check if user already exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		//Create new user
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user = new User({ email, password: hashedPassword });
		await user.save();

		res.status(201).json({ message: "User created successfully" });
	} catch (err) {}
});

/**
 * @route POST /api/auth/login
 * @desc Logs in a user
 * @access Public
 *
 * @params email, password
 * @returns JWT token
 */

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		//Check if user exists
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		//Check if password is correct
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		//Create JWT token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

		res.json({ token, user: { id: user._id, email: user.email } });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

/**
 * @route GET /api/auth/user
 * @desc Get user data
 * @access Private
 *
 * @params JWT token
 * @middleware verifyToken
 * @returns User data
 */
router.get("/user", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });

		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
