import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation-bar/Navigation";
import Home from "./components/pages/home-page/Home";
import RecentTransfer from "./components/pages/recent-transfer-page/RecentTransfer";
import MyFiles from "./components/pages/file-system-page/MyFiles";
import AccountSettings from "./components/pages/account-settings-page/AccountSettings";
import Auth from "./components/pages/user-auth-page/Auth";
import { useAuth } from "./context/AuthContext";
import LoginSuccess from "./components/notifcation-popup/LoginSuccess";
import { useEffect } from "react";

//EXAMPLE API CALL USING AXIOS see backend for the server
const apiCall = () => {
	axios
		.get("http://localhost:3000")
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

function App() {
	const { notificationMessage } = useAuth();

	return (
		<>
			<div className="flex flex-row w-screen max-h-screen">
				{/*sidebar*/}
				<Navigation />

				{/*main content*/}
				<div className="w-full relative">
					{/* Global Login Success Notification */}
					{notificationMessage && <LoginSuccess />}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/recent-transfer" element={<RecentTransfer />} />
						<Route path="/my-files" element={<MyFiles />} />
						<Route path="/account-settings" element={<AccountSettings />} />
						<Route path="/login" element={<Auth />} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
