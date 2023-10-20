<script lang="ts">
	import Heading from "$components/shared/Heading.svelte";
	import { getUsageColorClass } from "$lib/getUsageColorClass";

	import type { Device } from "./types";

	export let device: Device;

	$: cpuUsage = device.cpu;
	$: ramUsage = device.ram;
	$: cpuColor = getUsageColorClass(cpuUsage);
	$: ramColor = getUsageColorClass(ramUsage);
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
			{device.userName}
		</Heading>
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
	<td class={cpuColor}>
		<Heading type="title" noColor>
			{cpuUsage}%
		</Heading>
	</td>
	<td class={ramColor}>
		<Heading type="title" noColor>
			{ramUsage}%
		</Heading>
	</td>
</tr>
