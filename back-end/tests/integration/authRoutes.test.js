require("../testSetup");

const request = require("supertest");
const app = require("../../app");

describe("Auth API Tests", () => {
	let testEmail = `test${Date.now()}@test.com`;
	let token = "";

	// Register a new user
	it("should register a new user", async () => {
		const res = await request(app).post("/auth/register").send({ email: testEmail, password: "password123" });

		expect(res.statusCode).toEqual(201);
		expect(res.body.message).toEqual("User registered successfully");
	});

	// Prevent duplicate email registrations
	it("should prevent duplicate email registrations", async () => {
		const res = await request(app).post("/auth/register").send({ email: testEmail, password: "password123" });

		expect(res.statusCode).toEqual(400);
		expect(res.body.message).toEqual("User already exists");
	});

	// Log in the user
	it("should log in the user and return a token", async () => {
		const res = await request(app).post("/auth/login").send({ email: testEmail, password: "password123" });

		expect(res.statusCode).toEqual(200);
		expect(res.body.accessToken).toBeDefined();

		token = res.body.accessToken;
	});

	//Log out the user
	it("should log out the user and receive a message", async () => {
		const res = await request(app).post("/auth/logout").set("Authorization", `Bearer ${token}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body.message).toEqual("Logged out successfully");
	});

	// Get user information with a valid token
	it("should get the user's information with a valid token", async () => {
		const res = await request(app).get("/auth/user").set("Authorization", `Bearer ${token}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body.email).toEqual(testEmail);
	});

	// Invalid token test
	it("should return 401 for invalid token", async () => {
		const res = await request(app).get("/auth/user").set("Authorization", `Bearer invalidtoken`);

		expect(res.statusCode).toEqual(403);
		expect(res.body.message).toEqual("Invalid token. Authentication failed.");
	});

	it("should return 403 for expired token", async () => {
		console.log("TO BE IMPLEMENTED");
	});

	it("should return 403 for invalid token", async () => {
		console.log("TO BE IMPLEMENTED");
	});
});
