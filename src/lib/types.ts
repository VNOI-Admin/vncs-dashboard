import type { ChartConfiguration, ChartType, DefaultDataPoint } from "chart.js";

import type { COLOR_SCHEMES } from "./constants";

export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export type ChartWorkerEvent<
	TType extends ChartType = ChartType,
	TData extends unknown[] = DefaultDataPoint<TType>,
	TLabel = unknown,
> = {
    type: "__INIT_WORKER__",
	canvas: OffscreenCanvas;
    width: number;
    height: number;
	config: ChartConfiguration<TType, TData, TLabel>;
} | {
    type: "__UPDATE_CHART__",
    newData: TData[number];
};

export type CpuChartWorkerEvent = ChartWorkerEvent<"line", number[], string>;