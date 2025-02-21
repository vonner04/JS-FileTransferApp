const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser, getUser } = require("../../controllers/authController");
const User = require("../../models/User");

jest.mock("../../models/User"); // Mock Mongoose model
jest.mock("bcryptjs"); // Mock bcrypt
jest.mock("jsonwebtoken"); // Mock JWT

describe("Auth Controller - Unit Tests", () => {
	let mockReq, mockRes;

	beforeEach(() => {
		mockReq = { body: {}, user: {} };
		mockRes = { json: jest.fn(), status: jest.fn().mockReturnThis() };
	});

	it("should register a user successfully", async () => {
		mockReq.body = { email: "test@example.com", password: "password123" };
		User.findOne.mockResolvedValue(null); // No existing user
		bcrypt.genSalt.mockResolvedValue("salt");
		bcrypt.hash.mockResolvedValue("hashedpassword");
		User.prototype.save = jest.fn().mockResolvedValue();

		await registerUser(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(201);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "User registered successfully" });
	});

	it("should not register a duplicate user", async () => {
		mockReq.body = { email: "test@example.com", password: "password123" };
		User.findOne.mockResolvedValue({ email: "test@example.com" }); // Existing user

		await registerUser(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "User already exists" });
	});

	it("should log in successfully and return a token", async () => {
		mockReq.body = { email: "test@example.com", password: "password123" };
		User.findOne.mockResolvedValue({ email: "test@example.com", password: "hashedpassword" });
		bcrypt.compare.mockResolvedValue(true);
		jwt.sign.mockReturnValue("mockAccessToken");

		await loginUser(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith({ accessToken: "mockAccessToken" });
	});

	it("should return 400 if the password is incorrect", async () => {
		mockReq.body = { email: "test@example.com", password: "wrongpassword" };
		User.findOne.mockResolvedValue({ email: "test@example.com", password: "hashedpassword" });
		bcrypt.compare.mockResolvedValue(false); // Incorrect password

		await loginUser(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Incorrect password" });
	});

	it("should return 500 if an error occurs during login", async () => {
		mockReq.body = { email: "test@example.com", password: "password123" };
		User.findOne.mockRejectedValue(new Error("Database error"));

		await loginUser(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({ message: "Server error" });
	});
});
