import type { OS } from "$lib/types";

export interface Device {
	userId: string;
	userFirstName: string;
	userLastName: string;
	os: OS;
	osImage: string;
}
