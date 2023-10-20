import { randomUUID } from "node:crypto";

import { error } from "@sveltejs/kit";

import * as logger from "$lib/log";

import type { PageServerLoad } from "./$types";

interface User {
	username: string;
	isOnline: 0 | 1;
	ip: string;
	cpu: number;
	ram: number;
	ping: number;
}

const fetchUrl = `/contestant/[userId]`;

export const load: PageServerLoad = ({ params, locals, depends }) => {
	const logInfo = `requestId = ${randomUUID()}, userId = ${params.userId}`;

	logger.log("fetching:", `${fetchUrl} (${logInfo})...`);

	const data = locals.db
		.query<User, [string]>(
			"SELECT username, is_online AS isOnline, ip_address AS ip, cpu, ram, ping FROM User WHERE username = ?",
		)
		.get(params.userId);

	if (data === null) {
		logger.error("fetch failed:", `${fetchUrl} (${logInfo}, err = USER_NON_EXISTENT)...`);
		throw error(404, "User does not exist.");
	}

	depends("contestant:data:info");

	logger.success("fetched:", `${fetchUrl} (${logInfo})...`);

	return {
		title: `Contestant ${data.username}`,
		userId: data.username,
		isOnline: data.isOnline,
		ip: data.ip,
		cpu: data.cpu,
		ram: data.ram,
		ping: data.ping,
	};
};
