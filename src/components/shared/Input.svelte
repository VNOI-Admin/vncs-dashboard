<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	import { clsx } from "$lib/clsx";

	import Text from "./Text.svelte";

	interface InputProps extends Omit<HTMLInputAttributes, "placeholder"> {
		label: string;
		id: string;
		errorTextId?: string;
		errorText?: string;
		sameLine?: boolean;
		value?: any;
	}

	const {
		label,
		id,
		errorTextId,
		errorText,
		sameLine = false,
		value,
		...rest
	} = $props<InputProps>();
</script>

<div class="relative">
	<style>
		.input:placeholder-shown:focus + .label {
			@apply top-0.5 translate-y-0 text-xs text-neutral-700 dark:text-gray-300;
		}
		.input:placeholder-shown:not(:focus) + .label {
			@apply top-1/2 -translate-y-1/2 text-sm text-black dark:text-white;
		}
		.input:not(:placeholder-shown) + .label {
			@apply top-0.5 text-xs text-neutral-700 dark:text-gray-300;
		}
	</style>
	<input
		{id}
		class={clsx(
			"input block h-[44px] w-full rounded-lg px-2.5 pt-2.5 text-sm shadow-md transition-opacity disabled:opacity-50",
			"border border-neutral-400 focus:border-accent-light focus:outline-none dark:border-neutral-700 dark:focus:border-accent-dark",
			"bg-white text-black dark:bg-neutral-1000 dark:text-white",
		)}
		aria-invalid={!!errorText}
		aria-describedby={errorTextId}
		placeholder=" "
		{...rest}
	/>
	<label
		class="label absolute left-2.5 block font-medium transition-all duration-100 ease-in"
		for={id}
	>
		{label}
	</label>
	{#if !!errorText && errorTextId}
		<Text variant="error" id={errorTextId}>{errorText}</Text>
	{/if}
</div>
