<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	import { clsx } from "$lib/clsx";

	import Text from "./Text.svelte";

	type InputVariant = "sm" | "md";

	interface $$Props extends HTMLInputAttributes {
		label: string;
		id: string;
		errorTextId?: string;
		errorText?: string;
		variant?: InputVariant;
		sameLine?: boolean;
	}

	const mapVariantToClass: Record<InputVariant, string> = {
		sm: "w-fit px-2.5 py-0.5",
		md: "w-full p-2.5",
	};

	export let label: $$Props["label"],
		id: $$Props["id"],
		errorTextId: $$Props["errorTextId"] = undefined,
		errorText: $$Props["errorText"] = undefined,
		variant: InputVariant = "md",
		sameLine: boolean = false;
</script>

<label
	class={clsx(
		"block text-xl font-medium text-gray-900 dark:text-gray-300",
		sameLine && "flex flex-row gap-2",
	)}
>
	{label}
	<input
		{id}
		class={clsx(
			"block rounded-md text-sm transition-opacity disabled:opacity-50 shadow-md",
			"focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800",
			"bg-white text-black",
			"dark:bg-neutral-1000 dark:text-white dark:placeholder:text-gray-400",
			mapVariantToClass[variant],
		)}
		aria-invalid={!!errorText}
		aria-describedby={errorTextId}
		{...$$restProps}
	/>
</label>

{#if !!errorText && errorTextId}
	<Text variant="error" id={errorTextId}>{errorText}</Text>
{/if}
