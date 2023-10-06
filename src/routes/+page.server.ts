import { faker } from "@faker-js/faker";

import freebsdPng from "$lib/static/freebsd.png";
import linuxPng from "$lib/static/linux.png";
import macPng from "$lib/static/macos.png";
import windowsPng from "$lib/static/windows.png";

import type { PageServerLoad } from "./$types";

const SUPPORTED_OS = ["windows", "linux", "macos", "freebsd", "other"] as const;

type OS = (typeof SUPPORTED_OS)[number];

interface Data {
	userId: string;
	userFirstName: string;
	userLastName: string;
	os: OS;
	osImage: string;
}

export const load: PageServerLoad = () => {
	const mapOSToImage: Record<OS, string> = {
		windows: windowsPng,
		linux: linuxPng,
		macos: macPng,
		freebsd: freebsdPng,
		other: windowsPng,
	};

	return {
		devices: Array.from({
			length: faker.number.int({
				min: 20,
				max: 50,
			}),
		}).map((_) => {
			const os =
				SUPPORTED_OS[
					faker.number.int({
						min: 0,
						max: SUPPORTED_OS.length - 1,
					})
				];
			return {
				userId: `${
					["MIL", "APR", "ARD", "6-4", "IMC"][
						faker.number.int({
							min: 0,
							max: 4,
						})
					]
				}-${faker.number.int({
					min: 0,
					max: 255,
				})}`,
				userFirstName: faker.person.firstName(),
				userLastName: faker.person.lastName(),
				os,
				osImage: mapOSToImage[os],
			} satisfies Data;
		}),
	};
};
