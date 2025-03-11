/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-background": "#2B3A55",
				"primary-background-hover": "#1E2A3F",
				"primary-text": "#FFFFFF",
				"primary-highlight-border": "#2B6CB0",
				"primary-highlight": "#454d5a",
			},
			transitionProperty: {
				width: "width",
			},
		},
	},
	plugins: [],
};
