<script lang="ts">
	import { faker } from "@faker-js/faker";
	import { onMount } from "svelte";

	import { CPU_CHART_MAX_LENGTH } from "$lib/constants";
	import type { CpuRamChartType, CpuRamChartWorkerEvent } from "$lib/types";

	let chartRef: HTMLCanvasElement, divRef: HTMLDivElement;

	export let chartType: CpuRamChartType, chartWidth: number, chartHeight: number;

	let canvasWorker: Worker;

	onMount(() => {
		const loadCpuRamChart = async () => {
			const ctx = chartRef.transferControlToOffscreen();

			const CanvasWorker = (await import("$lib/cpuRamChartWorker?worker")).default;

			canvasWorker = new CanvasWorker();

			canvasWorker.postMessage(
				{
					type: "__INIT_WORKER__",
					chartType,
					canvas: ctx,
					width: chartWidth,
					height: chartHeight,
					config: {
						type: "line",
						data: {
							labels: [" ", " ", " ", " ", " ", " ", " ", " "],
							datasets: [
								{
									label: "CPU%",
									data: Array.from({ length: CPU_CHART_MAX_LENGTH }).map(() =>
										faker.number.int({ min: 0, max: 100 }),
									),
									backgroundColor: [
										"rgba(255, 99, 132, 0.2)",
										"rgba(54, 162, 235, 0.2)",
										"rgba(255, 206, 86, 0.2)",
										"rgba(75, 192, 192, 0.2)",
										"rgba(153, 102, 255, 0.2)",
										"rgba(255, 159, 64, 0.2)",
									],
									borderColor: [
										"rgba(255, 99, 132, 1)",
										"rgba(54, 162, 235, 1)",
										"rgba(255, 206, 86, 1)",
										"rgba(75, 192, 192, 1)",
										"rgba(153, 102, 255, 1)",
										"rgba(255, 159, 64, 1)",
									],
									borderWidth: 1,
									fill: "start",
								},
							],
						},
						options: {
							scales: {
								y: {
									beginAtZero: true,
								},
							},
							elements: {
								line: {
									tension: 0,
								},
							},
							animation: false,
						},
					},
				} satisfies CpuRamChartWorkerEvent,
				[ctx],
			);

			setInterval(() => {
				canvasWorker.postMessage({
					type: "__UPDATE_CHART__",
					chartType,
					newData: faker.number.int({
						min: 10,
						max: 50,
					}),
				} satisfies CpuRamChartWorkerEvent);
			}, 2000);
		};

		loadCpuRamChart();
	});
</script>

<div class="h-full w-full" bind:this={divRef}>
	<canvas class="block" bind:this={chartRef} />
</div>
