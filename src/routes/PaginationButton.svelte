<script lang="ts" generics="ButtonType extends 'a' | 'button'">
	import type { SvelteHTMLElements } from "svelte/elements";

	import { clsx } from "$lib/clsx";

	let as: ButtonType,
		active: boolean | undefined = false,
		className: string | undefined = undefined;

	type $$Props = SvelteHTMLElements[ButtonType] & {
		as: ButtonType;
		active?: boolean;
		class?: string;
	};

	export { as, active, className as class };
</script>

<svelte:element
	this={as}
	class={clsx(
		"transition-colors-opacity relative inline-flex h-[2.5rem] w-fit min-w-[2.5rem] items-center justify-center rounded-md",
        "p-2 text-sm font-medium shadow-md duration-100 focus:z-20 disabled:opacity-50 select-none",
		active
			? "bg-gray-200 text-black dark:bg-neutral-800 dark:text-white"
			: clsx(
					"bg-white [&:not(:disabled)]:hover:bg-gray-200",
					"dark:[&:not(:disabled)]:bg-neutral-1000 dark:[&:not(:disabled)]:hover:bg-neutral-800",
                    "text-neutral-700 dark:text-gray-300 [&:not(:disabled)]:hover:text-black dark:[&:not(:disabled)]:hover:text-white",
			  ),
		className,
	)}
	{...$$restProps}
>
	<slot />
</svelte:element>
