<script>
	import { page } from "$app/stores";
	import Box from "$components/shared/Box.svelte";
	import Heading from "$components/shared/Heading.svelte";
	import Image from "$components/shared/Image.svelte";
</script>

<div class="flex h-full w-full items-center justify-center">
	<Box>
		<Heading type="title-large">An error occurred - {$page.status}</Heading>
		<Heading type="title">{$page.error?.message}</Heading>
		<div class="flex flex-row items-center gap-2">
			<Image
				width={32}
				height={32}
				alt=""
				class="rounded-md content-[url(/vncs-light.png)] dark:content-[url(/vncs-dark.png)]"
			/>
            <Heading type="title">VNCS Dashboard</Heading>
		</div>
	</Box>
</div>
