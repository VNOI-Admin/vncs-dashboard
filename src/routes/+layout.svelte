<script lang="ts">
	import "../app.css";

	import { onMount } from "svelte";

	import { page } from "$app/stores";
	import ToggleScheme from "$components/layouts/ToggleScheme.svelte";
	import Image from "$components/shared/Image.svelte";
	import Heading from "$components/shared/Heading.svelte";
	import { isColorScheme } from "$lib/isColorScheme";
	import { colorScheme } from "$lib/stores/colorScheme";
	import Text from "$components/shared/Text.svelte";
	import { clsx } from "$lib/clsx";

	onMount(() => {
		const newTheme = document.documentElement.dataset.theme;
		$colorScheme = isColorScheme(newTheme) ? newTheme : "light";
		colorScheme.subscribe((value) => {
			document.documentElement.dataset.theme = value;
			localStorage.setItem("theme", value);
		});
	});

	$: title = $page.data.title ? `${$page.data.title} - VNCS Dashboard` : "VNCS Dashboard";

	$: isDark = $colorScheme === "dark";

	interface AsideMenuLink {
		href: string;
		title: string;
	}

	const ASIDE_MENU_LINKS = [
		{
			href: "/",
			title: "Home",
		},
		{
			href: "/logging",
			title: "Logging",
		},
	] satisfies AsideMenuLink[];
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<link rel="canonical" href={$page.url.href} />
	<meta name="theme-color" content={isDark ? "#000000" : "#FFFFFF"} />
</svelte:head>

<nav class="sticky flex h-fit max-h-screen w-full items-center gap-4 p-4 md:justify-between">
	<a
		href="/"
		class="flex items-center gap-2 [&>*]:!text-[#dd2219] dark:[&>*]:!text-[#fbfb00]"
		aria-label="Go to home"
	>
		<Image
			width={32}
			height={32}
			alt=""
			class="rounded-md content-[url(/vncs-light.png)] dark:content-[url(/vncs-dark.png)]"
		/>
		<Heading type="title-large">VNCS</Heading>
	</a>
	<ToggleScheme />
</nav>
<main id="main-content">
	<div class="flex w-full flex-col gap-2 self-stretch p-2 md:flex-row">
		<aside class="px-2 md:flex-[1_1_0]">
			<Heading type="title-large">Menu</Heading>
			<ul class="flex w-full flex-col gap-2 mt-4">
				{#each ASIDE_MENU_LINKS as { href, title }}
					<li
						class={clsx(
							"w-full rounded-md px-2 py-1 transition-colors duration-100",
							$page.url.pathname === href
								? "bg-gray-200 text-black dark:bg-neutral-800 dark:text-white"
								: "text-neutral-700 hover:bg-gray-200 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white",
						)}
					>
						<a {href}>
							<Text>{title}</Text>
						</a>
					</li>
				{/each}
			</ul>
		</aside>
		<section class="flex h-full w-full flex-col gap-2 px-2 md:flex-[5_5_0]">
			<slot />
		</section>
	</div>
</main>
