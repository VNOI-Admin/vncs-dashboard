<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	import { clsx } from "$lib/clsx";

	import Text from "./Text.svelte";

	interface InputProps extends HTMLInputAttributes {
		label: string;
		id: string;
		errorTextId?: string;
		errorText?: string;
		sameLine?: boolean;
		value?: any;
		shrinkLabelOnFocus?(value: any): boolean;
	}

	const {
		label,
		id,
		errorTextId,
		errorText,
		sameLine = false,
		value,
		shrinkLabelOnFocus = (value) => value === null || value === undefined || value === "",
		...rest
	} = $props<InputProps>();

	// let inputValue = $state<any>(undefined);
	let inputValue = $state<any>(value ?? undefined);

	const shouldShrinkLabelOnFocus = $derived(shrinkLabelOnFocus(inputValue));
</script>

<div class="relative">
	<input
		{id}
		class={clsx(
			"peer block h-[44px] rounded-lg text-sm shadow-md transition-opacity disabled:opacity-50 w-fit px-2.5 pt-2.5",
			"focus:border-accent-light dark:focus:border-accent-dark border border-neutral-400 focus:outline-none dark:border-neutral-700",
			"bg-white text-black dark:bg-neutral-1000 dark:text-white dark:placeholder:text-gray-400",
		)}
		aria-invalid={!!errorText}
		aria-describedby={errorTextId}
		bind:value={inputValue}
		{...rest}
	/>
	<label
		class={clsx(
			"absolute left-2.5 block font-medium text-black transition-all duration-100 ease-in dark:text-white",
			shouldShrinkLabelOnFocus
				? "top-1/2 -translate-y-1/2 text-sm peer-focus:top-0.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-neutral-700 peer-focus:dark:text-gray-300"
				: "top-0.5 text-xs text-neutral-700 dark:text-gray-300",
		)}
		for={id}
	>
		{label}
	</label>
	{#if !!errorText && errorTextId}
		<Text variant="error" id={errorTextId}>{errorText}</Text>
	{/if}
</div>
