<script>
	import AspectRatio from '@/components/AspectRatio.svelte'

	export let type = 'tablet'
	export let image, alt

	const ratios = {
		'tablet': '4/3',
		'phone': '1/2'
	}

	let classes = ''
	export { classes as class }
</script>

<figure class="{type} shadow {classes}">
	<AspectRatio
		ratio="{ratios[type]}"
		useScale="{false}"
	>
		<img 
			src="{image}"
			alt="{alt}"
		>
	</AspectRatio>
</figure>

<style>
	/* 
		- only display the device frame if css variables are supported
		- default/fallback is showing the image by itself
	*/
	@supports (background-color: var(--color-bg)) {
		figure {
			--bezel-radius: 4.5% / 6%;
			--bezel-width-x: 5%;
			--bezel-width-y: 5%;

			background-color: var(--color-bg);
			border-radius: var(--bezel-radius);
			border: 1px solid var(--color-border);
			display: block;
			overflow: hidden;
			position: relative;
			padding: var(--bezel-width-y) var(--bezel-width-x);
		}

		@media screen and (min-width: 40em) {
			figure {
				border-width: 2px;
			}
		}

		/* select the AspectRatio container */
		figure > :global(*) {
			--screen-radius:  0.75% / 1%;

			border-radius: var(--screen-radius);
			border: 1px solid var(--color-border);
		}

		figure img {
			object-fit: cover;
			object-position: top center;
		}

		figure.phone {
			--bezel-radius: 10% / 5%;
			--bezel-width-x: 3.5%;
			--bezel-width-y: 11%;
		}

		figure.phone img {
			--screen-radius: 2% / 1%;
		}
	}
</style>