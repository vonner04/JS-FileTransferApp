import React, { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

function LoginSuccess() {
	const { successMessage, clearSuccessMessage } = useAuth();

	// Hide success message after 3 seconds and clear timeout on re-render
	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				clearSuccessMessage();
			}, 3000);

			return () => clearTimeout(timer); // Cleanup timeout
		}
	}, [successMessage, clearSuccessMessage]);

	if (!successMessage) return null; // Avoid unnecessary rendering

	return (
		<div className="absolute top-4 right-4 bg-green-500 text-white flex items-center p-3 rounded-lg shadow-md animate-fade-in">
			<AiOutlineCheckCircle className="text-2xl mr-2" />
			<span>{successMessage}</span>
		</div>
	);
}

export default LoginSuccess;
