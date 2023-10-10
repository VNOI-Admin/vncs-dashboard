import { faker } from "@faker-js/faker";

import { mapOSToImage, SUPPORTED_OS } from "$lib/constants";
import type { OS } from "$lib/types";

import type { PageServerLoad } from "./$types";

interface Data {
	userId: string;
	userFirstName: string;
	userLastName: string;
	os: OS;
	osImage: string;
}

export const load: PageServerLoad = () => {
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
