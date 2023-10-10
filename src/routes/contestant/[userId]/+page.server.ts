import { faker } from "@faker-js/faker";

import { mapOSToImage, SUPPORTED_OS } from "$lib/constants";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
	const os =
		SUPPORTED_OS[
			faker.number.int({
				min: 0,
				max: SUPPORTED_OS.length - 1,
			})
		];
	return {
		title: `Contestant ${params.userId}`,
		userName: faker.person.fullName(),
		userId: params.userId,
		os,
		osImage: mapOSToImage[os],
	};
};
