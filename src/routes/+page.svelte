<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	// import { browser } from "$app/environment";
	import { invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import Heading from "$components/shared/Heading.svelte";
	import { range } from "$lib/range";

	import type { PageData } from "./$types";
	import DeviceInfo from "./DeviceInfo.svelte";
	import PaginationButton from "./PaginationButton.svelte";
	import Text from "$components/shared/Text.svelte";
	import Input from "$components/shared/Input.svelte";
	import ChevronRight from "$components/icons/ChevronRight.svelte";
	import { clsx } from "$lib/clsx";

	export let data: PageData;

	let isQuickNavigateOpen: boolean;

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

	$: currentPage = $page.url.searchParams.get("page");

	onMount(() => {
		const interval = setInterval(() => invalidate("home:query"), 10000);

		return () => clearInterval(interval);
	});
</script>

<Heading type="title-large">Monitor</Heading>
<button
	class="flex flex-row items-center gap-2 [&>*]:select-none"
	on:click={() => (isQuickNavigateOpen = !isQuickNavigateOpen)}
>
	<ChevronRight
		width={24}
		height={24}
		class={clsx(
			"max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px] transition duration-100 dark:invert",
			isQuickNavigateOpen && "rotate-90",
		)}
	/>
	<Text>Quick navigate</Text>
</button>
{#if isQuickNavigateOpen}
	<div
		class="flex h-fit w-full flex-col gap-2"
		transition:fly={{
			duration: 150,
		}}
	>
		<form method="GET" action="/">
			<Input
				label="To page"
				id="home-quick-navigate-page"
				type="text"
				name="page"
				variant="sm"
				sameLine
			/>
		</form>
		<div class="flex h-fit w-full flex-row flex-wrap gap-2">
			{#each range(0, data.totalPages - 1) as navigatePage}
				<PaginationButton
					as="a"
					href={`/?page=${navigatePage}`}
					active={!!currentPage && +currentPage === navigatePage}
				>
					{navigatePage}
				</PaginationButton>
			{/each}
		</div>
	</div>
{/if}
<div class="h-full w-full rounded-md bg-white shadow-lg dark:bg-neutral-1000">
	<div class="relative h-full w-full overflow-x-auto overflow-y-auto">
		<!-- TODO: add `Attention needed` with colors, add search function? -->
		<table class="absolute w-full table-auto border-separate border-spacing-4">
			<thead>
				<tr
					class="[&>th]:sticky [&>th]:top-0 [&>th]:bg-white [&>th]:transition-colors [&>th]:duration-100 dark:[&>th]:bg-neutral-1000"
				>
					<th class="text-left md:w-[15%]">
						<Heading type="title">ID</Heading>
					</th>
					<th class="text-left md:w-[25%]">
						<Heading type="title">Name</Heading>
					</th>
					<th class="text-left md:w-[15%]">
						<Heading type="title">IP</Heading>
					</th>
					<th class="text-left md:w-[15%]">
						<Heading type="title">Online</Heading>
					</th>
					<th class="text-left md:w-[15%]">
						<Heading type="title">CPU usage</Heading>
					</th>
					<th class="text-left md:w-[15%]">
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
</div>
