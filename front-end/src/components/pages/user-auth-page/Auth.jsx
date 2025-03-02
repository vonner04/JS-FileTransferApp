import React, { useState } from "react";
import "../../../styles/form.css";
import { AiOutlineGoogle, AiOutlineInstagram, AiOutlineFacebook } from "react-icons/ai";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../../../hooks/useAuthForm";

export default function Auth() {
	const { login, register, notificationMessage } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const navigate = useNavigate();
	const { formData, errors, isFormValid, handleChange } = useAuthForm(isRegistering);

	/**
	 * formData.confirmPassword has to be cleared to an empty string due to isFormValid logic
	 * in useAuthForm.js
	 */
	const toggleRegister = () => {
		setIsRegistering(!isRegistering);
		formData.confirmPassword = "";
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
					{/* Email */}
					<input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={`input-style ${errors.email ? "border-red-500" : "border-gray-200"}`} required />
					{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

					{/* Password */}
					<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={`input-style ${errors.password ? "border-red-500" : "border-gray-200"}`} required />
					{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

					{/* Confirm Password (only in Register mode) */}
					{isRegistering && (
						<>
							<input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className={`input-style ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`} required />
							{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
						</>
					)}

					{/* Submit Button */}
					<button type="submit" className={`submission-button ${!isFormValid && "opacity-50 cursor-not-allowed"}`} disabled={!isFormValid}>
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
