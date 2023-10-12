<script lang="ts">
	import { faker } from "@faker-js/faker";
	import { onMount } from "svelte";

	import Heading from "$components/shared/Heading.svelte";
	import Image from "$components/shared/Image.svelte";
	import { getUsageColorClass } from "$lib/getUsageColorClass";
	import noAvatar from "$lib/static/no-avatar.webp";
	import type { OS } from "$lib/types";

	import type { PageData } from "./$types";
	import CpuRamChart from "./CpuRamChart.svelte";

	export let data: PageData;

	const mapOSToName: Record<OS, string> = {
		windows: "Windows",
		macos: "macOS",
		linux: "Linux",
		freebsd: "FreeBSD",
		other: "Other",
	};

	let cpuUsage = 0,
		ramUsage = 0;

	onMount(() => {
		const interval = setInterval(() => {
			cpuUsage = faker.number.int({
				min: 5,
				max: 100,
			});
			ramUsage = faker.number.int({
				min: 5,
				max: 100,
			});
		}, 2000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex w-full flex-col gap-4 p-2 md:p-10">
	<div class="flex w-full flex-row items-center gap-3">
		<Image
			src={noAvatar}
			class="rounded-full"
			alt="Your profile picture"
			width={150}
			height={150}
		/>
		<div>
			<div class="flex flex-row items-center gap-2">
				<Image src={data.osImage} alt="" width={32} height={32} />
				<Heading type="title">
					{mapOSToName[data.os]}
				</Heading>
			</div>
			<Heading type="title-large">
				{data.userName}
			</Heading>
			<Heading type="title">
				{data.userId}
			</Heading>
		</div>
	</div>
	<div class="flex w-full flex-col gap-4 md:flex-row">
		<div class="flex w-full flex-col gap-4">
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
		<div class="flex w-full flex-col gap-4">
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
