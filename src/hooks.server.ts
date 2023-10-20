import type { Handle } from "@sveltejs/kit";
import Database from "bun:sqlite";
import path from "path";

const db = new Database(path.join(process.cwd(), "./src/db/database.sqlite"));

export const handle: Handle = ({ event, resolve }) => {
	event.locals.db = db;

	return resolve(event);
};
