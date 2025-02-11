import React, { useState } from "react";
import "../../../styles/form.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function Auth() {
	const { login } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
	const [showSuccess, setShowSuccess] = useState(false);
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

		//Popup notification
		setShowSuccess(true);
		navigate("/");
		setTimeout(() => setShowSuccess(false), 3000);
	};

	return (
		<div className="flex flex-col items-center justify-center p-8 h-screen bg-gray-100 text-primary-text relative">
			{/* Success Notification */}
			{showSuccess && (
				<div className="absolute top-4 right-4 bg-green-500 text-white flex items-center p-3 rounded-lg shadow-md animate-fade-in">
					<AiOutlineCheckCircle className="text-2xl mr-2" />
					<span>Login Successful</span>
				</div>
			)}
			{/* Form */}
			<div className="bg-primary-background p-8 w-96 rounded-lg shadow-md">
				<h2 className="text-center text-2xl font-semibold mb-6">{isRegistering ? "Register" : "Login"}</h2>
			</div>
		</div>
	);
}
