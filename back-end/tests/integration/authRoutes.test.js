const request = require("supertest");
const app = require("../../server");

describe("Auth API Tests", () => {
	let testEmail = `test${Date.now()}@test.com`;
	let token = "";

	it("should register a new user", async () => {
		const res = await request(app).post("/auth/register").send({ email: testEmail, password: "password123" });

		expect(res.statusCode).toEqual(201);
		expect(res.body.message).toEqual("User registered successfully");
	});

	it("should prevent duplicate email registrations", async () => {
		const res = await request(app).post("/auth/register").send({ email: testEmail, password: "password123" });

		expect(res.statusCode).toEqual(400);
		expect(res.body.message).toEqual("User already exists");
	});

	it("should log in the user and return a token", async () => {
		const res = await request(app).post("/auth/login").send({ email: testEmail, password: "password123" });

		expect(res.statusCode).toEqual(200);
		expect(res.body.accessToken).toBeDefined();
		token = res.body.accessToken;
	});

	it("should get the user's information with valid token", async () => {
		const res = await request(app).get("/auth/user").set("Authorization", `Bearer ${token}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body.email).toEqual(testEmail);
	});
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
