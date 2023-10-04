<script lang="ts">
	import "../app.css";

	import { onMount } from "svelte";

	import { page } from "$app/stores";
	import ToggleScheme from "$components/layouts/ToggleScheme.svelte";
	import Image from "$components/shared/Image.svelte";
	import Heading from "$components/shared/Heading.svelte";
	import { isColorScheme } from "$lib/isColorScheme";
	import vncsPng from "$lib/static/vncs-primary.png";
	import { colorScheme } from "$lib/stores/colorScheme";

	onMount(() => {
		const newTheme = document.documentElement.dataset.theme;
		$colorScheme = isColorScheme(newTheme) ? newTheme : "light";
		colorScheme.subscribe((value) => {
			document.documentElement.dataset.theme = value;
			localStorage.setItem("theme", value);
		});
	});

	$: title = $page.data.title ? `${$page.data.title} - VNCS` : "VNCS";

	$: isDark = $colorScheme === "dark";
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<link rel="canonical" href={$page.url.href} />
	<meta name="theme-color" content={isDark ? "#000000" : "#FFFFFF"} />
</svelte:head>

<div class="p-2 w-full">
	<div class="w-full flex items-center p-4 justify-between">
		<a href="/" class="flex items-center gap-2 [&>*]:!text-[#dd2219] dark:[&>*]:!text-[#fbfb00]" aria-label="Go to home">
			<Image width={32} height={32} alt="" class="rounded-md content-[url(/vncs-light.png)] dark:content-[url(/vncs-dark.png)]" />
			<Heading type="title-large">VNCS</Heading>
		</a>
		<div>
			<ToggleScheme />
		</div>
	</div>
	<slot />
</div>
