<!--
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
-->

<script>
	export let sources = '',
		alt = '',
		border = false,
		contain = false,
		cover = false

	$: borderClass = border ? 'border border-solid' : ''

	let classes = ''
	export { classes as class }

	$: defaultSrc = sources.find(source => source.default).sizes[0].path

	function enhancedFormat (sources) {
		return sources.filter(source => !source.default)
	}

	// generate a srcset string
	function srcset (sizes) {
		return sizes.map((source) => {
			return source.size
				? `${source.path} ${source.size}w`
				: source.path
		})
	}
</script>

<picture
	class="{borderClass} {classes}"
	class:contain
	class:cover
>
	{#each enhancedFormat(sources) as source}
		<source
			srcset="{srcset(source.sizes)}"
			type="image/{source.format}"
		>
	{/each}
	<img
		src="{defaultFormat(sources)}"
		{alt}
	>
</picture>
