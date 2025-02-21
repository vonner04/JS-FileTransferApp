const express = require("express");
const { registerUser, loginUser, logoutUser, getUser } = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Public routes

/**
 * @desc Route that takes email and password and creates a new user in the database if the email is not already in use.
 * Expects: { email: String, password: String } in the request body.
 * Returns: { message: String } in the response body.
 */
router.post("/register", registerUser);

/**
 * @desc Route that takes email and password and logs in a user if the email and password are correct.
 * Expects: { email: String, password: String } in the request body.
 * Returns: { accessToken: String } in the response body.
 */
router.post("/login", loginUser);

// Protected routes
/**
 * @desc Route that logs out a user.
 * Expects: Nothing in the request body.
 * Returns: Nothing in the response body.
 */
router.post("/logout", verifyToken, logoutUser);

/**
 * @desc Route that gets the user's information.
 * Returns: { email: String } in the response body.
 */
router.get("/user", verifyToken, getUser);

module.exports = router;
