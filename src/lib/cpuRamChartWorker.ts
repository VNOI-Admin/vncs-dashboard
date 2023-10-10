// Since we are not doing anything too complex, repeating code seems fine for now.
import {
	CategoryScale,
	Chart,
	Filler,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
} from "chart.js";

import { CPU_CHART_MAX_LENGTH, RAM_CHART_MAX_LENGTH } from "./constants";
import type { CpuRamChartWorkerEvent } from "./types";

Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement, Filler);

Chart.defaults.elements.point.pointStyle = "circle";
Chart.defaults.elements.point.radius = 0;

let cpuChart: Chart<"line", number[], string>;
let ramChart: Chart<"line", number[], string>;

onmessage = (event: MessageEvent<CpuRamChartWorkerEvent>) => {
	if (event.data.type === "__INIT_WORKER__") {
		const { chartType, canvas, width, height, config } = event.data;

		switch (chartType) {
			case "cpu": {
				cpuChart = new Chart(canvas as unknown as HTMLCanvasElement, config);

				// Resizing the chart must be done manually, since OffscreenCanvas does not include event listeners.
				canvas.width = width;
				canvas.height = height;

				cpuChart.resize();
				break;
			}
			case "ram": {
				ramChart = new Chart(canvas as unknown as HTMLCanvasElement, config);

				// Resizing the chart must be done manually, since OffscreenCanvas does not include event listeners.
				canvas.width = width;
				canvas.height = height;

				ramChart.resize();
				break;
			}
		}
	} else if (event.data.type === "__UPDATE_CHART__") {
		const { chartType, newData } = event.data;
		switch (chartType) {
			case "cpu": {
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
				break;
			}
			case "ram": {
				const newDataset = ramChart.data.datasets[0].data;
				newDataset.push(newData);
				if (newDataset.length > RAM_CHART_MAX_LENGTH) {
					ramChart.data.datasets[0].data = newDataset.slice(
						newDataset.length - RAM_CHART_MAX_LENGTH,
					);
				} else {
					ramChart.data.datasets[0].data = newDataset;
				}
				ramChart.update();
				break;
			}
		}
	} else if (event.data.type === "__RESIZE_CHART__") {
		const { chartType, newWidth, newHeight } = event.data;
		switch (chartType) {
			case "cpu": {
				cpuChart.resize(newWidth, newHeight);
				break;
			}
			case "ram": {
				ramChart.resize(newWidth, newHeight);
				break;
			}
		}
	}
};
