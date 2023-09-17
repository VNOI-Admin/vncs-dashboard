import { createServer } from "node:http";
import { isIPv6 } from "node:net";

import { handler } from "./build/handler.js";
import vncsPackageJson from "./package.json";
import { createWSSInstance, onHttpServerUpgrade } from "./ws/index.js";

const HOSTNAME = process.env.HOSTNAME;
const PORT = parseInt(process.env.PORT || "8080");

if (isNaN(PORT)) {
	throw new Error("Invalid PORT provided.");
}

const formatHostname = (hostname: string) => (isIPv6(hostname) ? `[${hostname}]` : hostname);

const server = createServer((req, res) => {
	handler(req, res, () => {
		// do nothing
	});
});

const wss = createWSSInstance();

server.on("upgrade", (req, socket, head) => onHttpServerUpgrade(wss, req, socket, head));

server.on("listening", () => {
	const addr = server.address();
	const host = formatHostname(typeof addr === "object" ? addr?.address || "localhost" : addr);
	const port = typeof addr === "object" ? addr?.port || PORT : PORT;
	const appHost =
		!HOSTNAME || host === "0.0.0.0"
			? "localhost"
			: host === "[::]"
			? "[::1]"
			: formatHostname(HOSTNAME);
	console.log(`  VNCS DASHBOARD v${vncsPackageJson.version}`);
	console.log(`  ➜  Local:   http://${appHost}:${port}`);
	console.log(`  ➜  Network: http://${host}:${port}`);
});

server.listen(PORT, HOSTNAME);
