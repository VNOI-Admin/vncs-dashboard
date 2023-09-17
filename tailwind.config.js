import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			transitionProperty: {
				"colors-opacity": `${defaultTheme.transitionProperty.colors}, opacity`,
			},
		},
	},
	plugins: [],
};
