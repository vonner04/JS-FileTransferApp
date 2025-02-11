import React, { useState } from "react";
import "../../../styles/form.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function Auth() {
	const { login } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
	const navigate = useNavigate();

	const toggleRegister = () => setIsRegistering(!isRegistering);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isRegistering && formData.password !== formData.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		console.log(isRegistering ? "Registering" : "Logging in");
		login();
		navigate("/");
	};

	return (
		<div className="flex flex-col items-center justify-center p-8 h-screen bg-gray-100 text-primary-text relative">
			{/* Form */}
			<div className="bg-primary-background p-8 w-96 rounded-lg shadow-md">
				<h2 className="text-center text-2xl font-semibold mb-6">{isRegistering ? "Register" : "Login"}</h2>

				<form onSubmit={handleSubmit} className="flex flex-col">
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						className="p-3 rounded-md bg-gray-200 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>

					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						className="p-3 rounded-md bg-gray-200 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>

					{isRegistering && ( //Show confirm password field only when registering
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="p-3 rounded-md bg-gray-200 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					)}
					<button type="submit" className="bg-blue-500 text-white p-3 rounded-md hover:bg-primary-highlight-border">
						{isRegistering ? "Register" : "Login"}
					</button>
				</form>
				<p className="text-center mt-4">
					{isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
					<span onClick={toggleRegister} className="text-primary-highlight-border cursor-pointer hover:underline">
						{isRegistering ? "Login" : "Register"}
					</span>
				</p>
			</div>
		</div>
	);
}
