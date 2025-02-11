import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	// Mock login/logout functions
	const login = () => {
		setIsAuthenticated(true);
		setSuccessMessage("Login Successful");
	};
	const logout = () => {
		setIsAuthenticated(false);
		setSuccessMessage("Logout Successful");
	};

	const clearSuccessMessage = () => {
		setSuccessMessage("");
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, successMessage, clearSuccessMessage }}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
