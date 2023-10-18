import { faker } from "@faker-js/faker";
import { error } from "@sveltejs/kit";

import { mapOSToImage, SUPPORTED_OS } from "$lib/constants";

import type { PageServerLoad } from "./$types";
import type { Device } from "./types";

interface User {
	ip: string;
	username: string;
	isOnline: 0 | 1;
	cpu: number;
	ram: number;
	ping: number;
}

export const load: PageServerLoad = ({ url: { searchParams }, depends, locals }) => {
	const page = parseInt(searchParams.get("page") ?? "0", 10);
	if (isNaN(page)) {
		throw error(400, "Invalid page.");
	}
	const data = locals.db
		.query<User, [number, number]>(
			"SELECT ip_address AS ip, username, is_online as isOnline, cpu, ram, ping FROM User LIMIT ? OFFSET ?",
		)
		.all(20, page);

	depends("home:query");

	return {
		devices: data.map(({ username: userId, ip, cpu, ram, ping }) => {
			const os =
				SUPPORTED_OS[
					faker.number.int({
						min: 0,
						max: SUPPORTED_OS.length - 1,
					})
				];
			return {
				userId,
				userFirstName: faker.person.firstName(),
				userLastName: faker.person.lastName(),
				os,
				osImage: mapOSToImage[os],
				ip,
				cpu,
				ram,
				ping,
			} satisfies Device;
		}),
	};
};
