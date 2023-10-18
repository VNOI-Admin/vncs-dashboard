import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "svelte-adapter-bun";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				"script-src": ["self", "strict-dynamic"],
			},
		},
		alias: {
			$components: "./src/components",
		},
		inlineStyleThreshold: 2048,
	},
};

export default config;
