import { useState, useEffect } from "react";
import { validateField } from "../utility/validation";

export const useAuthForm = (isRegistering) => {
	const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		setErrors((prevErrors) => {
			const newErrors = { ...prevErrors, ...validateField(name, value, formData, isRegistering) };

			// Remove the error text below an input box
			if (!validateField(name, value, formData, isRegistering)[name]) {
				delete newErrors[name];
			}

			return newErrors;
		});
	};

	//Check if form is valid
	useEffect(() => {
		const hasErrors = Object.keys(errors).length > 0;
		const hasEmptyFields = Object.values(formData).some((val) => val.trim() === "");
		setIsFormValid(!hasErrors && !hasEmptyFields);
	}, [errors, formData]);

	return { formData, errors, isFormValid, handleChange };
};
