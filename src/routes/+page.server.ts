import { randomUUID } from "node:crypto";

import { redirect } from "@sveltejs/kit";

import { PAGE_SIZE } from "$lib/constants";
import * as logger from "$lib/log";
import { readonlyArrayIncludes } from "$lib/readonlyArrayIncludes";

import type { PageServerLoad } from "./$types";
import { VALID_ORDER_BY_VALUES, VALID_ORDER_VALUES } from "./constants";
import type { Device } from "./types";

interface User {
	ip: string;
	username: string;
	isOnline: 0 | 1;
	cpu: number;
	ram: number;
	ping: number;
}

export const load: PageServerLoad = ({ url, depends, locals }) => {
	const logInfo = `page = /, requestId = ${randomUUID()}`;

	logger.log("fetching:", `(${logInfo})...`);

	const totalPages = Math.ceil(
		(locals.db.query<{ count: number }, []>("SELECT COUNT(*) AS count FROM User").get()
			?.count ?? 0) / PAGE_SIZE,
	);

	const pageQuery = url.searchParams.get("page"),
		orderByQuery = url.searchParams.get("orderBy"),
		orderQuery = url.searchParams.get("order");

	const page = pageQuery !== null ? parseInt(pageQuery, 10) : undefined;

	if (page === undefined || isNaN(page) || page < 0 || page > totalPages - 1) {
		const nextUrl = new URL(url);
		nextUrl.searchParams.set("page", "0");
		throw redirect(301, nextUrl);
	}

	if (orderByQuery === null || !readonlyArrayIncludes(VALID_ORDER_BY_VALUES, orderByQuery)) {
		const nextUrl = new URL(url);
		nextUrl.searchParams.set("orderBy", "username");
		throw redirect(301, nextUrl);
	}

	if (orderQuery === null || !readonlyArrayIncludes(VALID_ORDER_VALUES, orderQuery)) {
		const nextUrl = new URL(url);
		nextUrl.searchParams.set("order", "desc");
		throw redirect(301, nextUrl);
	}

	const data = locals.db
		.query<User, [number, number]>(
			`SELECT ip_address AS ip, username, is_online as isOnline, cpu, ram, ping FROM User ORDER BY ${orderByQuery} ${orderQuery.toUpperCase()} LIMIT ? OFFSET ?`,
		)
		.all(PAGE_SIZE, page * PAGE_SIZE);

	depends("home:query");

	logger.success("fetched:", `(${logInfo})...`);

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
