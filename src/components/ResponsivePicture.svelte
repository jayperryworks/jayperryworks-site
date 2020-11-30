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
		cover = false,
		fill = false

	$: borderClass = border ? 'border border-solid' : ''

	let classes = ''
	export { classes as class }

	// Get the default (smallest) version
	$: defaultFormat = sources.find(source => source.default)
	$: defaultSrc = defaultFormat.sizes[0].path

	// Get the enhanced (larger) versions
	$:enhancedFormat = sources.filter(source => !source.default)

	// generate a srcset string
	function srcset (sizes) {
		return sizes.map((source) => {
			return source.size
				? `${source.path} ${source.size}w`
				: source.path
		})
	}
</script>

<style type="text/scss">
	picture {
		display: inline-block;
		max-width: 100%;
		max-height: 100%;
		overflow: hidden;
	}

	img {
		object-fit: scale-down;
		width: 100%;
		height: 100%;
	}

	.contain {
		object-fit: contain;
	}

	.cover {
		object-fit: cover;
	}

	.fill {
		// only do this if object-fit is supported,
		// so image doesn't get oddly cropped
		@supports (object-fit: scale-down) {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>

<picture
	class="{borderClass} {classes}"
>
	{#each enhancedFormat as source}
		<source
			srcset="{srcset(source.sizes)}"
			type="image/{source.format}"
		>
	{/each}
	<img
		src="{defaultSrc}"
		srcset="{srcset(defaultFormat.sizes.slice(1))}"
		{alt}
		class:contain
		class:cover
		class:fill
	>
</picture>
