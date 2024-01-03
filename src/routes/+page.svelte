<script lang="ts">
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
	import type { DeviceInfoKeys, OrderBy } from "./types";
	import Sort from "$components/icons/Sort.svelte";

	const { data } = $props<{ data: PageData }>();

	let isQuickNavigateOpen = $state(false);

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

	const currentPage = $derived($page.url.searchParams.get("page")),
		order = $derived($page.url.searchParams.get("order")),
		orderBy = $derived($page.url.searchParams.get("orderBy"));

	$effect(() => {
		const interval = setInterval(() => invalidate("home:query"), 10000);

		return () => clearInterval(interval);
	});

	const mapDeviceInfoKeyToName: Record<DeviceInfoKeys, string> = {
		userId: "ID",
		ip: "IP",
		isOnline: "Online",
		ping: "Ping",
		cpu: "CPU usage",
		ram: "RAM usage",
	};

	const mapDeviceInfoKeyToOrderBy: Partial<Record<DeviceInfoKeys, OrderBy>> = {
		userId: "username",
		ip: "ip",
		ping: "ping",
		cpu: "cpu",
		ram: "ram",
	};

	// This should be in the same order as the one used in DeviceInfo.
	const deviceKeys = [
		"userId",
		"ip",
		"isOnline",
		"ping",
		"cpu",
		"ram",
	] satisfies DeviceInfoKeys[];
</script>

<Heading type="title-large"
	>Monitor

	<!-- Show number of online by counting isOnline in devices -->
	<span class="text-accent-light dark:text-accent-dark">
		({data.onlineCount} online)
	</span>

	<!-- Show number of offline by counting isOnline in devices -->
	<span class="text-accent-light dark:text-accent-dark">
		({data.offlineCount} offline)
	</span>

	<!-- total -->
	<span class="text-accent-light dark:text-accent-dark">
		({data.onlineCount + data.offlineCount} total)
	</span>
</Heading>
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
<div class="flex h-fit w-full flex-col gap-2">
	{#if isQuickNavigateOpen}
		<form method="GET" action="/">
			<Input
				label="To page"
				id="home-quick-navigate-page"
				type="search"
				inputmode="numeric"
				pattern="[0-9]*"
				name="page"
				min={0}
				max={data.totalPages - 1}
				sameLine
			/>
		</form>
	{/if}
	<div class="flex h-fit w-full flex-row flex-wrap gap-2">
		{#each range(0, data.totalPages - 1) as navigatePage}
			<PaginationButton
				as="a"
				href={(() => {
					const url = new URL($page.url);
					url.searchParams.set("page", "" + navigatePage);
					return url.toString();
				})()}
				active={!!currentPage && +currentPage === navigatePage}
			>
				{navigatePage}
			</PaginationButton>
		{/each}
	</div>

	<!-- Create a filter input with content from filter in url search param -->
	<form method="GET" action="/">
		<Input
			label="Filter"
			id="home-filter"
			type="search"
			name="filter"
			value={$page.url.searchParams.get("filter") ?? ""}
			sameLine
		/>
	</form>
</div>
<a
	class="text-accent-light underline dark:text-accent-dark"
	href={(() => {
		const url = new URL($page.url);
		url.searchParams.set("order", order === "desc" ? "asc" : "desc");
		return url.toString();
	})()}
>
	Sort by {order === "desc" ? "ascending" : "descending"} order
</a>
<div class="h-full w-full rounded-xl bg-white shadow-2xl dark:bg-neutral-1000">
	<div class="relative h-full w-full overflow-x-auto overflow-y-auto">
		<table class="absolute w-full table-auto border-separate border-spacing-4">
			<thead>
				<tr
					class="[&>th]:sticky [&>th]:top-0 [&>th]:bg-white [&>th]:transition-colors [&>th]:duration-100 dark:[&>th]:bg-neutral-1000"
				>
					{#each deviceKeys as key}
						{@const keyAsOrderByValue = mapDeviceInfoKeyToOrderBy[key]}
						<th class="text-left md:w-[calc(100%/6)]">
							<div class="flex items-center gap-2">
								<Heading type="title">{mapDeviceInfoKeyToName[key]}</Heading>
								{#if !!keyAsOrderByValue}
									<a
										href={(() => {
											const url = new URL($page.url);

											url.searchParams.set("orderBy", keyAsOrderByValue);

											return url.toString();
										})()}
										class={clsx(
											"rounded p-2 transition-colors duration-100",
											orderBy === keyAsOrderByValue
												? "bg-accent-light dark:bg-accent-dark [&>svg]:invert dark:[&>svg]:invert-0"
												: "[&>svg]:dark:invert",
										)}
									>
										<Sort
											width={24}
											height={24}
											class="transition-[filter] duration-100"
										/>
									</a>
								{/if}
							</div>
						</th>
					{/each}
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
