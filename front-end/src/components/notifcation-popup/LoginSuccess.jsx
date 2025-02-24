import React, { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

function LoginSuccess() {
	const { notificationMessage, clearNotificationMessage } = useAuth();

	// Hide success message after 3 seconds and clear timeout on re-render
	useEffect(() => {
		if (notificationMessage) {
			const timer = setTimeout(() => {
				clearNotificationMessage();
			}, 3000);

			return () => clearTimeout(timer); // Cleanup timeout
		}
	}, [notificationMessage, clearNotificationMessage]);

	if (!notificationMessage) return null; // Avoid unnecessary rendering

	return (
		<div className="absolute top-4 right-4 bg-green-500 text-white flex items-center p-3 rounded-lg shadow-md animate-fade-in">
			<AiOutlineCheckCircle className="text-2xl mr-2" />
			<span>{notificationMessage}</span>
		</div>
	);
}

export default LoginSuccess;
