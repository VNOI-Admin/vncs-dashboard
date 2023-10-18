<script lang="ts">
	import { onMount } from "svelte";
	// import { browser } from "$app/environment";
	import Heading from "$components/shared/Heading.svelte";

	import type { PageData } from "./$types";
	import DeviceInfo from "./DeviceInfo.svelte";
	import { invalidate } from "$app/navigation";

	export let data: PageData;

	// let wsEstablished = false;

	// if (browser && !wsEstablished) {
	// 	const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
	// 	const ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);
	// 	ws.addEventListener("open", (event) => {
	// 		wsEstablished = true;
	// 		console.log("[ws] connection open", event);
	// 	});
	// 	ws.addEventListener("close", (event) => {
	// 		console.log("[ws] connection closed", event);
	// 	});
	// 	ws.addEventListener("message", (event) => {
	// 		console.log("[ws] message received", event);
	// 	});
	// }

	onMount(() => {
		const interval = setInterval(() => invalidate("home:query"), 10000);

		return () => clearInterval(interval);
	});
</script>

<Heading type="title-large">Live contest update</Heading>
<div class="relative h-full w-full overflow-x-auto overflow-y-auto">
	<!-- TODO: add `Attention needed` with colors, add search function? -->
	<table class="absolute w-full table-auto border-separate border-spacing-4">
		<thead>
			<tr
				class="[&>th]:sticky [&>th]:top-0 [&>th]:bg-zinc-50 [&>th]:transition-colors [&>th]:duration-100 dark:[&>th]:bg-neutral-900"
			>
				<th class="text-left md:w-[15%]">
					<Heading type="title">OS</Heading>
				</th>
				<th class="text-left md:w-[15%]">
					<Heading type="title">ID</Heading>
				</th>
				<th class="text-left md:w-[25%]">
					<Heading type="title">First name</Heading>
				</th>
				<th class="text-left md:w-[25%]">
					<Heading type="title">Last name</Heading>
				</th>
				<th class="text-left md:w-[10%]">
					<Heading type="title">CPU usage</Heading>
				</th>
				<th class="text-left md:w-[10%]">
					<Heading type="title">RAM usage</Heading>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each data.devices as device}
				<DeviceInfo {device} />
			{/each}
		</tbody>
	</table>
</div>
