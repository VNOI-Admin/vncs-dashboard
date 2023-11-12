<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { clsx } from "$lib/clsx";

	type TextVariant = "default" | "error";

	interface TextProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "class"> {
		screenReaderOnly?: boolean;
		variant?: TextVariant;
	}

	const { screenReaderOnly = false, variant = "default", ...rest } = $props<TextProps>();

	const mapVariantToClass: Record<TextVariant, string> = {
		default: "text-black dark:text-white",
		error: "text-red-500 dark:text-red-400",
	};

	const mappedVariant = $derived(mapVariantToClass[variant]);
</script>

<p
	class={clsx(
        "text-lg",
		mappedVariant,
		screenReaderOnly && "sr-only",
	)}
	{...rest}
>
	<slot />
</p>
