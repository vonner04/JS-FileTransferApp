import React from "react";
import { AiOutlineSend, AiOutlineDownload, AiOutlineClockCircle } from "react-icons/ai";
import "../../../styles/home.css";

function Home() {
	return (
		<div className="flex flex-col items-center justify-center p-8 h-screen responsive-text-size bg-gray-100">
			<span className="mb-8 text-center">Simple And Reliable File Transfers</span>
			<button className="transfer-button">Transfer Files Here</button>
			<div className="card-alignment responsive-cards-column md:responsive-cards-row bg-gray-200 p-8">
				<div className="responsive-cards-column md:responsive-cards-row icon-text-alignment responsive-border">
					<AiOutlineSend className="text-6xl" />
					<span className="text-center">Send files up to X GB</span>
				</div>
				<div className="responsive-cards-column md:responsive-cards-row icon-text-alignment responsive-border">
					<AiOutlineDownload className="text-6xl" />
					<span className="text-center">Unlimited Downloads</span>
				</div>
				<div className="responsive-cards-column md:responsive-cards-row icon-text-alignment responsive-border">
					<AiOutlineClockCircle className="text-6xl" />
					<span className="text-center">See previous transfers</span>
				</div>
			</div>
		</div>
	);
}

export default Home;
