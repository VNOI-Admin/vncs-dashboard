import {
	CategoryScale,
	Chart,
	Filler,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
} from "chart.js";

import { CPU_CHART_MAX_LENGTH } from "./constants";
import type { CpuChartWorkerEvent } from "./types";

Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement, Filler);

let cpuChart: Chart<"line", number[], string>;

onmessage = (event: MessageEvent<CpuChartWorkerEvent>) => {
	if (event.data.type === "__INIT_WORKER__") {
		const { canvas, width, height, config } = event.data;
		cpuChart = new Chart(canvas as unknown as HTMLCanvasElement, config);

		Chart.defaults.elements.point.pointStyle = "circle";
		Chart.defaults.elements.point.radius = 0;

		// Resizing the chart must be done manually, since OffscreenCanvas does not include event listeners.
		canvas.width = width;
		canvas.height = height;

		cpuChart.resize();
	} else if (event.data.type === "__UPDATE_CHART__") {
		const { newData } = event.data;
		const newDataset = cpuChart.data.datasets[0].data;
		newDataset.push(newData);
		if (newDataset.length > CPU_CHART_MAX_LENGTH) {
			cpuChart.data.datasets[0].data = newDataset.slice(
				newDataset.length - CPU_CHART_MAX_LENGTH,
			);
		} else {
			cpuChart.data.datasets[0].data = newDataset;
		}
		cpuChart.update();
	}
};
