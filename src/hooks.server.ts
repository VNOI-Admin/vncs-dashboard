import type { Handle, HandleServerError } from "@sveltejs/kit";
import Database from "bun:sqlite";
import path from "path";

const db = new Database(path.join(process.cwd(), "./src/db/database.sqlite"));

db.exec("pragma journal_mode = wal");

export const handle: Handle = ({ event, resolve }) => {
	event.locals.db = db;

	return resolve(event);
};

export const handleError: HandleServerError = ({ error }) => {
	return {
		message: (error as any)?.message || "Whoops! An unexpected internal server error occurred.",
		code: (error as any)?.code ?? "UNKNOWN",
	};
};
