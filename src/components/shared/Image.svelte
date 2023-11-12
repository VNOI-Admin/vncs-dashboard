<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements";

	interface ImageProps extends HTMLImgAttributes {
		src?: string;
        alt: string;
		width: number;
		height: number;
	}

	const { loading = "lazy", decoding = "async", src = undefined, alt, ...rest } = $props<ImageProps>();
</script>

<img {src} {alt} {loading} {decoding} {...rest} />
