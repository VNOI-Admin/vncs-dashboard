<script lang="ts">
	// import { browser } from "$app/environment";
	import Heading from "$components/shared/Heading.svelte";
	import Image from "$components/shared/Image.svelte";
	import eaglePng from "$lib/static/eagle.png";
	import { faker } from "@faker-js/faker/locale/af_ZA";

	import type { PageData } from "./$types";

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
						<a class="link" href={`/contestant/${userId}`}>
							<Heading type="title" noColor>
								{userId}
							</Heading>
						</a>
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
						<!-- This text should change color when change delta meets a certain criteria -->
						<Heading type="title">
							{faker.number.int({
								min: 5,
								max: 100,
							})}%
						</Heading>
					</td>
					<td>
						<!-- This text should change color when change delta meets a certain criteria -->
						<Heading type="title">
							{faker.number.int({
								min: 5,
								max: 100,
							})}%
						</Heading>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
