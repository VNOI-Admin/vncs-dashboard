import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

import { createWSSInstance, onHttpServerUpgrade } from "./ws";

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: "integratedWebsocketServer",
			configureServer({ httpServer }) {
				if (!httpServer) return;
				const wss = createWSSInstance();
				httpServer.on("upgrade", (req, socket, head) =>
					onHttpServerUpgrade(wss, req, socket, head),
				);
			},
		},
	],
});
