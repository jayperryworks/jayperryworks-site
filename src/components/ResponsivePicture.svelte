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

	$: borderClass = border ? 'border solid' : ''

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

<picture
	class="{classes}"
	class:contain
	class:cover
>
	{#each enhancedFormat as source}
		<source
			srcset="{srcset(source.sizes)}"
			type="image/{source.format}"
		>
	{/each}
	<img
		class:fill
		class="{borderClass}"
		src="{defaultSrc}"
		srcset="{srcset(defaultFormat.sizes.slice(1))}"
		{alt}
	>
</picture>

<style>
	picture {
		position: relative;
		overflow: hidden;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.contain,
	.cover {
		display: block;
		width: 100%;
		height: 100%;
	}

	.contain img {
		object-fit: contain;

	}

	.cover img {
		object-fit: cover;
	}

	/* only do this if object-fit is supported, so image doesn't get oddly cropped */
	@supports (object-fit: scale-down) {
		.fill {
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
