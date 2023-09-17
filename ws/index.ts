import type { IncomingMessage } from "http";
import { nanoid } from "nanoid";
import type { Duplex } from "stream";
import type * as WebSocket from "ws";
import type { Server as BaseWebSocketServer, WebSocket as AnotherWebSocket } from "ws";
import { WebSocketServer } from "ws";

type BaseWebSocket = typeof WebSocket & WebSocket & typeof AnotherWebSocket;

export type ExtendedWebSocket = BaseWebSocket & {
	socketId: string;
};

export type ExtendedWebSocketServer = BaseWebSocketServer<ExtendedWebSocket>;

export const onHttpServerUpgrade = (
	wss: ExtendedWebSocketServer,
	req: IncomingMessage,
	sock: Duplex,
	head: Buffer,
) => {
	const pathname = req.url ? new URL(req.url, "http://n").pathname : null;
	if (pathname !== "/websocket") {
		return;
	}
	wss.handleUpgrade(req, sock, head, (ws) => {
		console.log("[wss] creating new connecttion");
		wss.emit("connection", ws, req);
	});
};

export const createWSSInstance = () => {
	const wss = new WebSocketServer({ noServer: true }) as ExtendedWebSocketServer;

	wss.on("connection", (ws: ExtendedWebSocket) => {
		ws.socketId = nanoid();
		console.log(`[wss] client connected (${ws.socketId})`);

		ws.on("close", () => {
			console.log(`[wss] client disconnected (${ws.socketId})`);
		});
	});

	return wss;
};
