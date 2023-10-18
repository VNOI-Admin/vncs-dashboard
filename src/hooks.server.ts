import type { Handle } from "@sveltejs/kit";
import { fileURLToPath } from "bun";
import Database from "bun:sqlite";
import path from "path";

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

const db = new Database(path.join(__dirname, "./db/database.sqlite"));

export const handle: Handle = ({ event, resolve }) => {
	event.locals.db = db;

	return resolve(event);
};
