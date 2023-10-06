<script lang="ts" context="module">
	import type { HTMLAttributes } from "svelte/elements";

	import { clsx } from "$lib/clsx";

	export type HeadingElement = "h1" | "h2" | "h3" | "h4";
	export type HeadingVariant = "default" | "error";
	export type HeadingType = "subtitle" | "title" | "title-large" | "display";

	const mapTypeToComponent: Record<
		HeadingType,
		{
			element: HeadingElement;
			className?: string;
		}
	> = {
		subtitle: {
			element: "h4",
			className: "text-base font-medium leading-5 md:text-base md:tracking-tight",
		},
		title: {
			element: "h3",
			className: "text-lg font-semibold leading-7 md:text-2xl md:tracking-tight",
		},
		"title-large": {
			element: "h2",
			className: "text-2xl font-bold leading-7 md:text-3xl md:tracking-tight",
		},
		display: {
			element: "h1",
			className: "text-4xl font-bold leading-[60px] md:text-5xl md:tracking-tight",
		},
	};

	const mapVariantToClass: Record<HeadingVariant, string> = {
		default: "text-black dark:text-white",
		error: "text-red-500 dark:text-red-400",
	};
</script>

<script lang="ts">
	interface $$Props extends Omit<HTMLAttributes<HTMLHeadingElement>, "class"> {
		variant?: HeadingVariant;
		type?: HeadingType;
		screenReaderOnly?: boolean;
	}

	let variant: HeadingVariant = "default",
		type: HeadingType = "title",
		screenReaderOnly: boolean = false;

	$: mappedComponent = mapTypeToComponent[type];
	$: mappedVariant = mapVariantToClass[variant];

	export { screenReaderOnly, type, variant };
</script>

<svelte:element
	this={mappedComponent.element}
	class={clsx(
		"break-words",
		mappedVariant,
		screenReaderOnly && "sr-only",
		mappedComponent.className,
	)}
	{...$$restProps}
>
	<slot />
</svelte:element>
