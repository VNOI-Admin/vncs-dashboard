<script lang="ts">
	import { faker } from "@faker-js/faker";
	import { onMount } from "svelte";

	import { CPU_CHART_MAX_LENGTH } from "$lib/constants";
	import type { CpuChartWorkerEvent } from "$lib/types";

	let chartRef: HTMLCanvasElement;

	const CANVAS_WIDTH = 300,
		CANVAS_HEIGHT = 200;

	onMount(() => {
		const loadCpu = async () => {
			const ctx = chartRef.transferControlToOffscreen();

			const CanvasWorker = (await import("$lib/cpuChartWorker?worker")).default;

			const canvasWorker = new CanvasWorker();

			canvasWorker.postMessage(
				{
					type: "__INIT_WORKER__",
					canvas: ctx,
					width: CANVAS_WIDTH,
					height: CANVAS_HEIGHT,
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
				} satisfies CpuChartWorkerEvent,
				[ctx],
			);

			setInterval(() => {
				canvasWorker.postMessage({
					type: "__UPDATE_CHART__",
					newData: faker.number.int({
						min: 10,
						max: 50,
					}),
				} satisfies CpuChartWorkerEvent);
			}, 2000);
		};

		loadCpu();
	});
</script>

<div class="flex items-center" style={`width:${CANVAS_WIDTH}px;height:${CANVAS_HEIGHT}px;`}>
	<canvas bind:this={chartRef} />
</div>
