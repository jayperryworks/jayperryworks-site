<!--
	An image tag with an (optional) srcset attribute

	sources = [
		{
			path: (STRING: path to file)
			size: (NUMBER or STRING: width of image)
		}
	]

	sources = (STRING: path to single image)
	- or -
	sources = [
		{
			format: (STRING: file format)
			default: (BOOLEAN: is it the default format?)
			sizes: [
				{
					path: (STRING: path to file)
					size: (NUMBER or STRING: width of image)
				}
			]
		}
	]

	if typeof sources == string, use an img element
	if sources.length === 1, use an img element with srcset
	if sources.length > 1, use a picture element
-->
<script>
	export let sources = '',
		alt = '',
		border = false,
		contain = false,
		cover = false

	$: src = Array.isArray(sources) ? sources[0].path : sources

	$: srcset = Array.isArray(sources)
		? sources.slice(1).map((source) => {
				if (source.size) {
					return `${source.path} ${source.size}w`
				}
				return source.path
			}).join(', ')
		: ''

	$: borderClass = border ? 'border border-solid' : ''

	let classes = ''
	export { classes as class }
</script>

<style type="text/scss">
	img {
		display: inline-block;
		max-width: 100%;
		object-fit: scale-down;
	}

	.contain {
		object-fit: contain;
	}

	.cover {
		object-fit: cover;
	}
</style>

<img
	class="{borderClass} {classes}"
	class:contain
	class:cover
	{src}
	{srcset}
	{alt}
/>

<!-- <picture class="{borderClass} {classes}">
	{#each format as formats}
		<source {srcset} type="image/{format}">
	{/each}
	<img {src} {alt}>
</picture> -->
