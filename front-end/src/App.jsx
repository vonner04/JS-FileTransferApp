import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation-bar/Navigation";
import Home from "./components/pages/home-page/Home";
import FileTransfer from "./components/pages/file-transfer-page/FileTransfer";
import RecentTransfer from "./components/pages/recent-transfer-page/RecentTransfer";
import MyFiles from "./components/pages/file-system-page/MyFiles";
import AccountSettings from "./components/pages/account-settings-page/AccountSettings";

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
	return (
		<>
			<div className="flex flex-row w-screen h-screen">
				{/*sidebar*/}
				<Navigation />

				{/*main content*/}
				<div className="w-full p-4">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/file-transfer" element={<FileTransfer />} />
						<Route path="/recent-transfer" element={<RecentTransfer />} />
						<Route path="/my-files" element={<MyFiles />} />
						<Route path="/account-settings" element={<AccountSettings />} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
