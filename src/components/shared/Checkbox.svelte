<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	import Text from "./Text.svelte";
	import { clsx } from "$lib/clsx";

	interface InputProps extends HTMLInputAttributes {
		label: string;
		id: string;
		errorTextId?: string;
		errorText?: string;
	}

	let { label, id, errorTextId, errorText, checked, ...rest } = $props<InputProps>();
</script>

<div class="flex gap-2">
	<input
        {id}
		type="checkbox"
		class={clsx(
			"peer mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded focus:outline-none",
			"border border-neutral-400 bg-white dark:border-neutral-700 dark:bg-neutral-1000",
			"checked:bg-accent-light dark:checked:bg-accent-dark checked:border-0 disabled:cursor-not-allowed disabled:opacity-50",
		)}
        bind:checked
		{...rest}
	/>
	<label
		for={id}
		class="select-none font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
	>
		{label}
	</label>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={4}
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
		class="pointer-events-none absolute mt-1 hidden h-4 w-4 invert peer-checked:block dark:invert-0"
	>
		<polyline points="20 6 9 17 4 12" />
	</svg>
	{#if !!errorText && errorTextId}
		<Text variant="error" id={errorTextId}>{errorText}</Text>
	{/if}
</div>
