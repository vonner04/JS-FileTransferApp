export const validateField = (name, value, formData, isRegistering) => {
	let errors = {};

	// Email Validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (name === "email" && !emailRegex.test(value)) {
		errors.email = "Invalid email format.";
	}

	// Password Validation
	if (name === "password" && value.length < 6) {
		errors.password = "Password must be at least 6 characters.";
	}

	// Confirm Password Validation
	if (isRegistering && (name === "password" || name === "confirmPassword")) {
		const updatedPassword = name === "password" ? value : formData.password;
		const updatedConfirm = name === "confirmPassword" ? value : formData.confirmPassword;

		if (updatedPassword && updatedConfirm && updatedPassword !== updatedConfirm) {
			errors.confirmPassword = "Passwords do not match.";
		}
	}

	return errors;
};
