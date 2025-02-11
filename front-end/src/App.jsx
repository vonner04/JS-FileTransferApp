import axios from "axios";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navigation from "./components/navigation-bar/Navigation";
import Home from "./components/pages/home-page/Home";
import RecentTransfer from "./components/pages/recent-transfer-page/RecentTransfer";
import MyFiles from "./components/pages/file-system-page/MyFiles";
import AccountSettings from "./components/pages/account-settings-page/AccountSettings";
import Auth from "./components/pages/user-auth-page/Auth";
import { AiOutlineCheckCircle } from "react-icons/ai";

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
	const { successMessage, clearSuccessMessage } = useAuth();

	//Hide success message after 3 seconds
	useEffect(() => {
		if (successMessage) {
			setTimeout(() => {
				clearSuccessMessage();
			}, 3000);
		}
	}, [successMessage, clearSuccessMessage]);

	return (
		<>
			<div className="flex flex-row w-screen max-h-screen">
				{/*sidebar*/}
				<Navigation />

				{/*main content*/}
				<div className="w-full relative">
					{/* Global Success Notification */}
					{successMessage && (
						<div className="absolute top-4 right-4 bg-green-500 text-white flex items-center p-3 rounded-lg shadow-md animate-fade-in">
							<AiOutlineCheckCircle className="text-2xl mr-2" />
							<span>{successMessage}</span>
						</div>
					)}
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
