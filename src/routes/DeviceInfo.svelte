<script lang="ts">
	import { faker } from "@faker-js/faker";

	import { onMount } from "svelte";

	import Heading from "$components/shared/Heading.svelte";
	import Image from "$components/shared/Image.svelte";
	import { getUsageColorClass } from "$lib/getUsageColorClass";
	import eaglePng from "$lib/static/eagle.png";

	import type { Device } from "./types";

	export let device: Device;

	$: cpuUsage = device.cpu;
	$: ramUsage = device.ram;
	$: cpuColor = getUsageColorClass(cpuUsage);
	$: ramColor = getUsageColorClass(ramUsage);
</script>

<tr>
	<td>
		<div class="flex flex-row flex-wrap items-center gap-2">
			{#if device.os === "linux" || device.os === "freebsd"}
				<Image
					class="content-[url(/vncs-light.png)] dark:content-[url(/vncs-dark.png)]"
					alt=""
					width={32}
					height={32}
				/>
			{:else}
				<Image src={eaglePng} alt="" width={32} height={32} />
			{/if}
			<Image src={device.osImage} alt={device.os} width={32} height={32} />
		</div>
	</td>
	<td>
		<a class="link" href={`/contestant/${device.userId}`}>
			<Heading type="title" noColor>
				{device.userId}
			</Heading>
		</a>
	</td>
	<td>
		<Heading type="title">
			{device.userFirstName}
		</Heading>
	</td>
	<td>
		<Heading type="title">
			{device.userLastName}
		</Heading>
	</td>
	<td class={cpuColor}>
		<!-- This text should change color when change delta meets a certain criteria -->
		<Heading type="title" noColor>
			{cpuUsage}%
		</Heading>
	</td>
	<td class={ramColor}>
		<!-- This text should change color when change delta meets a certain criteria -->
		<Heading type="title" noColor>
			{ramUsage}%
		</Heading>
	</td>
</tr>
