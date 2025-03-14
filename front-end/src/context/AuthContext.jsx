import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(null);
	const [notificationMessage, setNotificationMessage] = useState("");

	//Fetch user data on initial load
	useEffect(() => {
		if (token) {
			axios
				.get(`http://localhost:3000/auth/user`, { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => setUser(res.data))
				.catch((err) => console.error("Fetch User Error:", err));
		}
	}, [token]);
	console.log(notificationMessage);

	//User authentication functions
	const login = async (email, password) => {
		try {
			const res = await axios.post(`http://localhost:3000/auth/login`, { email, password }); //, { withCredentials: true } might need this
			setToken(res.data.accessToken);
			setIsAuthenticated(true);
			setNotificationMessage(res.data.message);
			return true;
		} catch (err) {
			console.error("Login Error:", err);
			setIsAuthenticated(false);
			setNotificationMessage(err.response.data.message);
			return false;
		}
	};

	const register = async (email, password) => {
		try {
			const res = await axios.post(`http://localhost:3000/auth/register`, { email, password });
			setIsAuthenticated(true);
			setNotificationMessage(res.data.message);
			return true;
		} catch (err) {
			console.error("Register Error:", err);
			setIsAuthenticated(false);
			setTimeout(() => {
				setNotificationMessage(err.response?.data?.message || "Login Failed");
			}, 50);
			return false;
		}
	};

	const logout = async () => {
		try {
			const res = await axios.post(`http://localhost:3000/auth/logout`, { token });
			localStorage.removeItem("token");
			setToken("");
			setUser(null);
			setIsAuthenticated(false);
			setNotificationMessage(res.data.message);
			return true;
		} catch (err) {
			console.error("Logout Error:", err);
			setNotificationMessage(err.response.data.message);
			return false;
		}
	};

	const clearNotificationMessage = () => {
		setNotificationMessage("");
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				logout,
				register,
				notificationMessage: notificationMessage,
				clearNotificationMessage: clearNotificationMessage,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
