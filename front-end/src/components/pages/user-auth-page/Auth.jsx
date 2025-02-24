import React, { useState } from "react";
import "../../../styles/form.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineGoogle, AiOutlineInstagram, AiOutlineFacebook } from "react-icons/ai";

export default function Auth() {
	const { login, register, notificationMessage } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
	const navigate = useNavigate();

	const toggleRegister = () => setIsRegistering(!isRegistering);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isRegistering && formData.password !== formData.confirmPassword) {
			//Check if passwords match
			alert("Passwords do not match");
			return;
		}
		let success = false;
		if (isRegistering) {
			success = await register(formData.email, formData.password);
		} else {
			success = await login(formData.email, formData.password);
		}
		if (success) {
			navigate("/");
			console.log(isRegistering ? "Registering" : "Logging in");
		}
	};

	//Alternative login methods using social media; placeholders
	const handleGoogleSignIn = () => {
		console.log("Google Sign In");
	};

	const handleInstagramSignIn = () => {
		console.log("Instagram Sign In");
	};

	const handleFacebookSignIn = () => {
		console.log("Facebook Sign In");
	};

	return (
		<div className="background-style">
			{/* Form */}
			<div className="form-container">
				<h2 className="text-center text-2xl font-semibold mb-6">{isRegistering ? "Register" : "Login"}</h2>

				<form onSubmit={handleSubmit} className="flex flex-col">
					<input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-style" required />

					<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input-style" required />

					{isRegistering && ( //Show confirm password field only when registering
						<input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="input-style" required />
					)}
					<button type="submit" className="submission-button">
						{isRegistering ? "Register" : "Login"}
					</button>
				</form>

				<div className="options-container">
					<p className="text-center text-gray-300 mb-2">Or continue with:</p>
					<div className="options-style">
						<button onClick={handleGoogleSignIn} className="alternative-sign-in-button google-color-button">
							<AiOutlineGoogle className="sign-in-options-logo-style" />
							Google
						</button>

						<button onClick={handleInstagramSignIn} className="alternative-sign-in-button instagram-color-button">
							<AiOutlineInstagram className="sign-in-options-logo-style" />
							Instagram
						</button>

						<button onClick={handleFacebookSignIn} className="alternative-sign-in-button facebook-color-button">
							<AiOutlineFacebook className="sign-in-options-logo-style" />
							Facebook
						</button>
					</div>
				</div>

				<p className="text-center mt-4">
					{isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
					<span onClick={toggleRegister} className="switch-prompt-style">
						{isRegistering ? "Login" : "Register"}
					</span>
				</p>
			</div>
		</div>
	);
}
