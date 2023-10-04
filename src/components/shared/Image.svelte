<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements";

	interface $$Props extends HTMLImgAttributes {
		src?: string;
        alt: string;
		width: number;
		height: number;
	}

	export let loading: $$Props["loading"] = "lazy",
		decoding: $$Props["decoding"] = "async",
        src: $$Props["src"] = undefined,
        alt: $$Props["alt"];
</script>

<img {src} {alt} {loading} {decoding} {...$$restProps} />
