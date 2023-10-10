import freebsdPng from "$lib/static/freebsd.png";
import linuxPng from "$lib/static/linux.png";
import macPng from "$lib/static/macos.png";
import windowsPng from "$lib/static/windows.png";

import type { OS } from "./types";

export const COLOR_SCHEMES = ["dark", "light"] as const;

export const CPU_CHART_MAX_LENGTH = 9;
export const RAM_CHART_MAX_LENGTH = 9;

export const SUPPORTED_OS = ["windows", "linux", "macos", "freebsd", "other"] as const;

export const mapOSToImage: Record<OS, string> = {
	windows: windowsPng,
	linux: linuxPng,
	macos: macPng,
	freebsd: freebsdPng,
	other: windowsPng,
};