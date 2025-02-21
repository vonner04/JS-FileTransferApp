const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Methods to generate access and refresh tokens
 */
const generateAccessToken = (user) => {
	return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (user) => {
	return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 *
 * @param {String} email
 * @param {String} password
 * @returns {String} message
 * @returns {Object} 201 - User registered successfully
 * @returns {Object} 400 - User already exists
 * @returns {Object} 500 - Server error
 */
const registerUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(400).json({ message: "User already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({ email, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 *
 * @param {String} email
 * @param {String} password
 * @returns {String} accessToken
 * @returns {Object} 400 - Invalid email or password
 * @returns {Object} 500 - Server error
 */
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "User not registered" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "Strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		res.status(200).json({ accessToken }); // Explicitly setting status 200
	} catch (err) {
		console.error("Login Error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Protected
 *
 * @returns {String} message
 */
const logoutUser = (req, res) => {
	res.clearCookie("refreshToken");
	res.json({ message: "Logged out successfully" });
};

/**
 * @route GET /api/auth/user
 * @desc Get user data
 * @access Protected
 *
 * @returns {Object} user if found
 * @returns {String} message if user not found
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Server error
 */
const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });

		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { registerUser, loginUser, logoutUser, getUser };
