<script lang="ts">
	import type { Action } from "svelte/action";

	import CanvasWorker from "$lib/cpuRamChartWorker?worker";
	import { CHART_MAX_LENGTH } from "$lib/constants";
	import type { CpuRamChartType, CpuRamChartWorkerEvent } from "$lib/types";
	import { colorScheme } from "$lib/stores/colorScheme";

	export let chartType: CpuRamChartType,
		chartWidth: number,
		chartHeight: number,
		chartUsage: number;

	const initChart: Action<HTMLCanvasElement, number> = (canvas) => {
		const ctx = canvas.transferControlToOffscreen();

		const canvasWorker = new CanvasWorker();

		canvasWorker.postMessage(
			{
				type: "__INIT_CHART__",
				chartType,
				canvas: ctx,
				width: chartWidth,
				height: chartHeight,
				config: {
					type: "line",
					data: {
						labels: Array(CHART_MAX_LENGTH).fill(" "),
						datasets: [
							{
								label: "CPU%",
								data: Array(CHART_MAX_LENGTH).fill(0),
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
					},
				},
			} satisfies CpuRamChartWorkerEvent,
			[ctx],
		);

		const unsubscribeColorScheme = colorScheme.subscribe((value) => {
			canvasWorker.postMessage({
				type: "__UPDATE_SCHEME__",
				chartType,
				colorScheme: value,
			} satisfies CpuRamChartWorkerEvent);
		});

		return {
			update(newData) {
				canvasWorker.postMessage({
					type: "__UPDATE_CHART__",
					chartType,
					newData,
				} satisfies CpuRamChartWorkerEvent);
			},
			destroy() {
				unsubscribeColorScheme();
				canvasWorker.postMessage({
					type: "__DESTROY_CHART__",
					chartType,
				} satisfies CpuRamChartWorkerEvent);
			},
		};
	};
</script>

<div class="h-full w-full">
	<canvas class="block" use:initChart={chartUsage} />
</div>
