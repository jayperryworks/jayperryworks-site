<script>
	import AspectRatio from '@/components/AspectRatio.svelte'
	import ResponsivePicture from '@/components/ResponsivePicture.svelte'

	export let type = 'tablet'
	export let image, alt

	const ratios = {
		'tablet': '4/3',
		'tablet-portrait': '3/4',
		'phone': '1/2'
	}

	let classes = ''
	export { classes as class }
</script>

<div class="bezel {type} shadow {classes}">
	<AspectRatio
		ratio="{ratios[type]}"
		useScale="{false}"
	>
		<ResponsivePicture
			alt="{alt}"
			sources="{image}"
		/>
	</AspectRatio>
</div>

<style>
	/* 
		- only display the device frame if css variables are supported
		- default/fallback is showing the image by itself
	*/
	@supports (background-color: var(--color-bg)) {
		.bezel {
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
			.bezel {
				border-width: 2px;
			}
		}

		/* select the AspectRatio container */
		.bezel > :global(*) {
			--screen-radius:  0.75% / 1%;

			border-radius: var(--screen-radius);
			border: 1px solid var(--color-border);
		}

		.bezel :global(img) {
			object-fit: cover;
			object-position: top center;
		}

		.bezel.tablet-portrait {
			--bezel-radius: 6% / 4.5%;
		}

		.bezel.tablet-portrait :global(img) {
			--screen-radius: 1% / 0.75%;
		}

		.bezel.phone {
			--bezel-radius: 10% / 5%;
			--bezel-width-x: 3.5%;
			--bezel-width-y: 11%;
		}

		.bezel.phone :global(img) {
			--screen-radius: 2% / 1%;
		}
	}
</style>