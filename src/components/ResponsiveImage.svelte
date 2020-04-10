<!--
	An image tag with an (optional) srcset attribute

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

	// find the default image path
	$: defaultFormat = sources.find(source => source.default)
	$: defaultSrc = defaultFormat.sizes[0].path
	// find the 'enhanced' sources, e.g. webp format
	$: enhancedFormat = sources.filter(source => !source.default)

	// generate a srcset string
	function srcset (sizes) {
		return sizes.slice(1).map((source) => {
			if (source.size) {
				return `${source.path} ${source.size}w`
			}
			return source.path
		})
	}

	$: borderClass = border ? 'border border-solid' : ''

	let classes = ''
	export { classes as class }
</script>

<style type="text/scss">
	img,
	picture {
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

{#if typeof sources === String}
	<img
		class="{borderClass} {classes}"
		class:contain
		class:cover
		{sources}
		{alt}
	/>
{:else}
	{#if sources.length === 1}
		<img
			class="{borderClass} {classes}"
			class:contain
			class:cover
			{defaultSrc}
			{srcset(sources[0].sizes)}
			{alt}
		/>
	{:else}
		<picture class="{borderClass} {classes}">
			{#each source as enhancedFormat}
				<source {srcset(source.sizes)} type="image/{source.format}">
			{/each}
			<img {defaultSrc} {srcset(defaultFormat)} {alt}>
		</picture>
	{/if}
{/if}
