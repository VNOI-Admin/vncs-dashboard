import { faker } from "@faker-js/faker";
import { error } from "@sveltejs/kit";

import { mapOSToImage, SUPPORTED_OS } from "$lib/constants";

import type { PageServerLoad } from "./$types";

interface User {
	username: string;
	isOnline: 0 | 1;
	ip: string;
	cpu: number;
	ram: number;
	ping: number;
}

export const load: PageServerLoad = ({ params, locals }) => {
	const data = locals.db.query<User, [string]>("SELECT username, is_online AS isOnline, ip_address AS ip, cpu, ram, ping FROM User WHERE username = ?").get(params.userId);

	if (data === null) {
		throw error(404, "User does not exist.");
	}

	const os =
		SUPPORTED_OS[
			faker.number.int({
				min: 0,
				max: SUPPORTED_OS.length - 1,
			})
		];
	return {
		title: `Contestant ${data.username}`,
		userName: faker.person.fullName(),
		userId: data.username,
		os,
		osImage: mapOSToImage[os],
		isOnline: data.isOnline,
		ip: data.ip,
		cpu: data.cpu,
		ram: data.ram,
		ping: data.ping,
	};
};
