<script lang="ts">
	import { browser } from "$app/environment";
	import Heading from "$components/shared/Heading.svelte";
	import Image from "$components/shared/Image.svelte";
	import eaglePng from "$lib/static/eagle.png";

	import type { PageData } from "./$types";
	import CpuChart from "./CpuChart.svelte";

	export let data: PageData;

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

<div class="flex w-full flex-col gap-2 self-stretch p-2 md:flex-row">
	<aside class="md:flex-[1_1_0]">
		<Heading type="title-large">Placeholder</Heading>
	</aside>
	<section class="flex h-full w-full flex-col gap-2 md:flex-[5_5_0]">
		<Heading type="display">User reports</Heading>
		<div class="relative h-full w-full overflow-x-auto overflow-y-auto">
			<table class="absolute table-auto border-separate border-spacing-4">
				<thead>
					<tr
						class="[&>th]:sticky [&>th]:top-0 [&>th]:bg-zinc-50 [&>th]:transition-colors [&>th]:duration-100 dark:[&>th]:bg-neutral-900"
					>
						<th class="text-left">
							<Heading type="title">OS</Heading>
						</th>
						<th class="text-left">
							<Heading type="title">ID</Heading>
						</th>
						<th class="text-left">
							<Heading type="title">First name</Heading>
						</th>
						<th class="text-left">
							<Heading type="title">Last name</Heading>
						</th>
						<th class="text-left">
							<Heading type="title">CPU usage</Heading>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each data.devices as { userId, userFirstName, userLastName, os, osImage }}
						<tr>
							<td>
								<div class="flex flex-row flex-wrap items-center gap-2">
									{#if os === "linux" || os === "freebsd"}
										<Image
											class="content-[url(/vncs-light.png)] dark:content-[url(/vncs-dark.png)]"
											alt=""
											width={32}
											height={32}
										/>
									{:else}
										<Image src={eaglePng} alt="" width={32} height={32} />
									{/if}
									<Image src={osImage} alt={os} width={32} height={32} />
								</div>
							</td>
							<td>
								<Heading type="title">
									{userId}
								</Heading>
							</td>
							<td>
								<Heading type="title">
									{userFirstName}
								</Heading>
							</td>
							<td>
								<Heading type="title">
									{userLastName}
								</Heading>
							</td>
							<td>
								<CpuChart />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
