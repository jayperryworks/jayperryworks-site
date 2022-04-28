<script lang="ts">
import Image from '@components/Image.svelte';
import Caption from '@components/Caption.svelte';

export let sources: Array<{
	path: string;
	width: number;
	height: number;
}>;

export let alt: string;
export let caption: string;
export let attribution: string;
export let border = false;
export let cover = false;
</script>

<figure class="type-align-center">
	<slot>
		<Image {sources} {border} {cover} {alt}/>
	</slot>

	{#if caption || attribution}
		<Caption
			class="margin-x-auto padding-top-xnarrow | content-width"
			{attribution}
		>
			{@html caption}
		</Caption>
	{/if}
</figure>

<style>
	figure {
		margin: 0;
		text-align: center;
	}
</style>
