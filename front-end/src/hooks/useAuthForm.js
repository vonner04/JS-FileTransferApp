import { useState, useEffect } from "react";
import { validateField } from "../utility/validation";

export const useAuthForm = (isRegistering) => {
	const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newFormData = { ...formData, [name]: value };
		setFormData(newFormData);

		setErrors((prevErrors) => {
			const newErrors = { ...prevErrors, ...validateField(name, value, newFormData, isRegistering) };
			// Remove error for this field if validation passes
			if (!validateField(name, value, newFormData, isRegistering)[name]) {
				delete newErrors[name];
			}
			return newErrors;
		});
	};

	//Check if form is valid
	useEffect(() => {
		const hasErrors = Object.keys(errors).length > 0;
		//This removes the confirmPassword value when checking empty fields of the formData during login
		const hasEmptyFields = Object.keys(formData)
			.filter((key) => (isRegistering ? true : key !== "confirmPassword"))
			.some((key) => formData[key].trim() === "");
		setIsFormValid(!hasErrors && !hasEmptyFields);
	}, [errors, formData]);

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	return { formData, errors, isFormValid, handleChange };
};
