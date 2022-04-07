<script lang="ts">
import test from '@lib/globalStyles/modules/borders.js';

console.log(test);
// Responsive image
// - loads an array of source objects and converts to a srcset attribute
export let sources: Array<{
		path: string;
		width: number;
		height: number;
	}>;
export let alt = '';
export let border = false;
export let contain = false;
export let cover = false;

let className = '';
export { className as class };

function srcsetString(images: Array<{
	path: string;
	width: number;
	height: number;
}>) {
	return images.slice(1).map((source) => {
		return `${source.path} ${source.width}w`;
	}).join(', ');
}

$: src = sources[0].path;
$: width = sources[0].width || '';
$: height = sources[0].height || '';
$: srcset = sources.length > 1 ? srcsetString(sources) : '';

</script>

<img
	class="{border ? 'border border-solid' : ''} {className}"
	class:contain
	class:cover
	decoding="async"
	loading="lazy"
	{src}
	{srcset}
	{alt}
	{width}
	{height}
/>

<style>
	img {
		display: inline-block;
		max-width: 100%;
		object-fit: scale-down;
		content-visibility: auto;
	}

	.contain,
	.cover {
		display: block;
		width: 100%;
		height: 100%;
	}

	.contain {
		object-fit: contain;
	}

	.cover {
		object-fit: cover;
	}
</style>
