<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { clsx } from "$lib/clsx";

	type $$Props = HTMLAttributes<HTMLDivElement>;
</script>

<div
	class={clsx(
		"transition-colors_opa flex w-[90vw] max-w-[500px] flex-col justify-center gap-6 rounded-md p-10 duration-100",
		"border border-neutral-300 bg-white dark:border-gray-700 dark:bg-neutral-900",
	)}
	{...$$restProps}
>
	<slot />
</div>
