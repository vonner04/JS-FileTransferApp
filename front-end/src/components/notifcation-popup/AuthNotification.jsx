import React, { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

function AuthNotification() {
	const { notificationMessage, clearNotificationMessage, isAuthenticated } = useAuth();

	// Hide success message after 3 seconds and clear timeout on re-render
	useEffect(() => {
		if (notificationMessage) {
			const timer = setTimeout(() => {
				clearNotificationMessage();
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [notificationMessage, clearNotificationMessage]);

	if (!notificationMessage) return null;

	return (
		<div
			className={`absolute top-4 right-4 text-white flex items-center p-3 rounded-lg shadow-md animate-fade-in z-[9999] 
                 ${isAuthenticated ? "bg-green-500" : "bg-red-500"}`}
		>
			<AiOutlineCheckCircle className="text-2xl mr-2" />
			<span>{notificationMessage}</span>
		</div>
	);
}

export default AuthNotification;
