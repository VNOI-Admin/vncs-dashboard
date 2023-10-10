import type { ChartConfiguration, ChartType, DefaultDataPoint } from "chart.js";

import type { COLOR_SCHEMES, SUPPORTED_OS } from "./constants";

export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export type ChartWorkerEvent<
	TChart extends string,
	TType extends ChartType = ChartType,
	TData extends unknown[] = DefaultDataPoint<TType>,
	TLabel = unknown,
> = { chartType: TChart } & (
	| {
			type: "__INIT_WORKER__";
			canvas: OffscreenCanvas;
			width: number;
			height: number;
			config: ChartConfiguration<TType, TData, TLabel>;
	  }
	| {
			type: "__UPDATE_CHART__";
			newData: TData[number];
	  }
	| {
			type: "__RESIZE_CHART__";
			newWidth: number;
			newHeight: number;
	  }
);

export type CpuRamChartType = "cpu" | "ram";

export type CpuRamChartWorkerEvent = ChartWorkerEvent<CpuRamChartType, "line", number[], string>;

export type OS = (typeof SUPPORTED_OS)[number];
