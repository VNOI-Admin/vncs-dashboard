<script lang="ts">
	import { onMount } from "svelte";

	import Heading from "$components/shared/Heading.svelte";
	import Image from "$components/shared/Image.svelte";
	import { getUsageColorClass } from "$lib/getUsageColorClass";
	import noAvatar from "$lib/static/no-avatar.webp";

	import type { PageData } from "./$types";
	import CpuRamChart from "./CpuRamChart.svelte";
	import { invalidate } from "$app/navigation";

	export let data: PageData;

	$: cpuUsage = data.cpu;
	$: ramUsage = data.ram;

	onMount(() => {
		const interval = setInterval(() =>invalidate("contestant:data:info"), 10000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex w-full flex-col gap-4 p-2 md:p-10">
	<div class="flex w-full flex-row items-center gap-8 bg-white dark:bg-neutral-1000 rounded-xl px-4 py-2 shadow-lg">
		<Image
			src={noAvatar}
			class="rounded-full"
			alt="Your profile picture"
			width={150}
			height={150}
		/>
		<div>
			<Heading type="title-large">
				{data.userId}
			</Heading>
			<Heading type="title">
				IP: {data.ip} • Online: {data.isOnline ? "✅" : "❌"} • Ping: {data.ping}ms
			</Heading>
		</div>
	</div>
	<div class="flex w-full flex-col gap-4 md:flex-row md:flex-wrap">
		<div class="flex w-full flex-col gap-4 md:flex-[1_1_0] md:overflow-x-auto bg-white dark:bg-neutral-1000 rounded-xl p-4 shadow-lg">
			<Heading type="title-large">
				CPU usage <span class={getUsageColorClass(cpuUsage)}>{cpuUsage}%</span>
			</Heading>
			<div class="w-full max-w-[500px] overflow-y-auto">
				<CpuRamChart
					chartType="cpu"
					chartWidth={500}
					chartHeight={200}
					chartLabel="CPU%"
					chartUsage={cpuUsage}
				/>
			</div>
		</div>
		<div class="flex w-full flex-col gap-4 md:flex-[1_1_0] md:overflow-x-auto bg-white dark:bg-neutral-1000 rounded-xl p-4 shadow-lg">
			<Heading type="title-large">
				RAM usage <span class={getUsageColorClass(ramUsage)}>{ramUsage}%</span>
			</Heading>
			<div class="w-full max-w-[500px] overflow-y-auto">
				<CpuRamChart
					chartType="ram"
					chartWidth={500}
					chartHeight={200}
					chartLabel="RAM%"
					chartUsage={ramUsage}
				/>
			</div>
		</div>
	</div>
</div>
