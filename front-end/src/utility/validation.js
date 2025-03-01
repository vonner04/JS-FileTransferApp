export const validateField = (name, value, formData, isRegistering) => {
	let errors = {};

	//Email Validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (name === "email" && !emailRegex.test(value)) {
		errors.email = "Invalid email format.";
	}

	//Validation for Passwords
	if (name === "password" && value.length < 6) {
		errors.password = "Password must be at least 6 characters";
	}

	if (isRegistering && name === "confirmPassword" && value !== formData.password) {
		errors.confirmPassword = "Password do not match";
	}

	return errors;
};
