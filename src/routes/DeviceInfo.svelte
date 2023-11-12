<script lang="ts">
	import Heading from "$components/shared/Heading.svelte";
	import { getPingColorClass } from "$lib/getPingColorClass";
	import { getUsageColorClass } from "$lib/getUsageColorClass";

	import type { Device } from "./types";

	const { device } = $props<{ device: Device }>();

	const pingColor = $derived(getPingColorClass(device.ping)),
		cpuColor = $derived(getUsageColorClass(device.cpu)),
		ramColor = $derived(getUsageColorClass(device.ram));
</script>

<tr>
	<td>
		<a class="link" href={`/contestant/${device.userId}`}>
			<Heading type="title" noColor>
				{device.userId}
			</Heading>
		</a>
	</td>
	<td>
		<Heading type="title">
			{device.ip}
		</Heading>
	</td>
	<td>
		<Heading type="title">
			{device.isOnline ? "✅" : "❌"}
		</Heading>
	</td>
	<td class={pingColor}>
		<Heading type="title" noColor>
			{device.ping} ms
		</Heading>
	</td>
	<td class={cpuColor}>
		<Heading type="title" noColor>
			{device.cpu}%
		</Heading>
	</td>
	<td class={ramColor}>
		<Heading type="title" noColor>
			{device.ram}%
		</Heading>
	</td>
</tr>
