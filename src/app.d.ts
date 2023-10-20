import type { Database } from "bun:sqlite";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: Database;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
