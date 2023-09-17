<script lang="ts">
	import { browser } from "$app/environment";

	let wsEstablished = false;

	if (browser && !wsEstablished) {
		const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
		const ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);
		ws.addEventListener("open", (event) => {
			wsEstablished = true;
			console.log("[ws] connection open", event);
		});
		ws.addEventListener("close", (event) => {
			console.log("[ws] connection closed", event);
		});
		ws.addEventListener("message", (event) => {
			console.log("[ws] message received", event);
		});
	}
</script>

<p>Test WS</p>
