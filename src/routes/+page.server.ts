import { randomUUID } from "node:crypto";

import { error, redirect } from "@sveltejs/kit";

import { PAGE_SIZE } from "$lib/constants";
import * as logger from "$lib/log";

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

const fetchUrl = "/";

export const load: PageServerLoad = ({ url: { searchParams }, depends, locals }) => {
	const logInfo = `requestId = ${randomUUID()}`;

	logger.log("fetching:", `${fetchUrl} (${logInfo})...`);

	const pageQuery = searchParams.get("page");

	if (pageQuery === null) {
		throw redirect(301, `/?page=0`);
	}

	const page = parseInt(pageQuery, 10);

	if (isNaN(page)) {
		logger.error("fetch failed:", `${fetchUrl} (${logInfo}, err = NAN_PAGE)...`);

		throw error(400, "Invalid page.");
	}

	const totalPages = Math.ceil(
		(locals.db.query<{ count: number }, []>("SELECT COUNT(*) AS count FROM User").get()
			?.count ?? 0) / PAGE_SIZE,
	);

	const data = locals.db
		.query<User, [number, number]>(
			"SELECT ip_address AS ip, username, is_online as isOnline, cpu, ram, ping FROM User ORDER BY id DESC LIMIT ? OFFSET ?",
		)
		.all(PAGE_SIZE, page * PAGE_SIZE);

	depends("home:query");

	logger.success("fetched:", `${fetchUrl} (${logInfo})...`);

	return {
		totalPages,
		devices: data.map(
			({ username: userId, ip, cpu, ram, ping, isOnline }) =>
				({
					userId,
					ip,
					cpu,
					ram,
					ping,
					isOnline: Boolean(isOnline),
				}) satisfies Device,
		),
	};
};
