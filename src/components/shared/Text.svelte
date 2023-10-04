<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { clsx } from "$lib/clsx";

	type TextVariant = "default" | "error";

	interface $$Props extends Omit<HTMLAttributes<HTMLParagraphElement>, "class"> {
		screenReaderOnly?: boolean;
		variant?: TextVariant;
	}

	export let screenReaderOnly: boolean = false,
		variant: TextVariant = "default";

	const mapVariantToClass: Record<TextVariant, string> = {
		default: "text-black dark:text-white",
		error: "text-red-500 dark:text-red-400",
	};

	$: mappedVariant = mapVariantToClass[variant];
</script>

<p
	class={clsx(
        "text-lg",
		mappedVariant,
		screenReaderOnly && "sr-only",
	)}
	{...$$restProps}
>
	<slot />
</p>
