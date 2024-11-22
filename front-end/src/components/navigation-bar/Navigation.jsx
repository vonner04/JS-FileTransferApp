import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TfiMenu, TfiHome, TfiShare, TfiTime, TfiFolder, TfiSettings } from "react-icons/tfi";
import "../../styles/navigation-bar.css";

function Navigation() {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleSidebar = () => setIsCollapsed(!isCollapsed);

	return (
		<div
			className={`relative top-0 left-0 h-screen ${
				isCollapsed ? "w-16" : "w-60"
			} m-0 flex flex-col bg-primary-background text-primary-text text-xl transition-width duration-300 ease-in-out`}
		>
			{/* Menu Icon */}
			<div className="flex flex-row justify-between items-center mt-4 px-4">
				{!isCollapsed && <span className="font-bold text-violet-200">SHARE KO-TO</span>}
				<TfiMenu className="sidebar-icon cursor-pointer" onClick={toggleSidebar} />
			</div>

			{/* Links */}
			<div className="flex flex-col mt-8 ">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`${isActive ? "active-link" : ""} ${
							isCollapsed ? "sidebar-icons-container-collapsed" : "sidebar-icons-container-expanded"
						} sidebar-hover-animation`
					}
				>
					<TfiHome className="sidebar-icon" />
					{!isCollapsed && <span>Home</span>}
				</NavLink>
				<NavLink
					to="/file-transfer"
					className={({ isActive }) =>
						`${isActive ? "active-link" : ""} ${
							isCollapsed ? "sidebar-icons-container-collapsed" : "sidebar-icons-container-expanded"
						} sidebar-hover-animation`
					}
				>
					<TfiShare className="sidebar-icon" />
					{!isCollapsed && <span>File Transfer</span>}
				</NavLink>
				<NavLink
					to="/recent-transfer"
					className={({ isActive }) =>
						`${isActive ? "active-link" : ""} ${
							isCollapsed ? "sidebar-icons-container-collapsed" : "sidebar-icons-container-expanded"
						} sidebar-hover-animation`
					}
				>
					<TfiTime className="sidebar-icon" />
					{!isCollapsed && <span>Recent Transfer</span>}
				</NavLink>
				<NavLink
					to="/my-files"
					className={({ isActive }) =>
						`${isActive ? "active-link" : ""} ${
							isCollapsed ? "sidebar-icons-container-collapsed" : "sidebar-icons-container-expanded"
						} sidebar-hover-animation`
					}
				>
					<TfiFolder className="sidebar-icon" />
					{!isCollapsed && <span>My Files</span>}
				</NavLink>
			</div>

			{/* Account Settings */}
			<NavLink
				to="/account-settings"
				className={({ isActive }) =>
					`${isActive ? "active-link" : ""} ${
						isCollapsed ? "sidebar-icons-container-collapsed" : "sidebar-icons-container-expanded"
					} sidebar-hover-animation mt-auto`
				}
			>
				<TfiSettings className="sidebar-icon" />
				{!isCollapsed && <span>My Account</span>}
			</NavLink>
		</div>
	);
}

export default Navigation;
