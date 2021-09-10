<script>
	// Display images or other content in a tight grid arrangement that acts like a self-contained composition
	let classes = ''
	export { classes as class }
</script>

<div class="collage {classes}">
	<slot>Add items here. Use 'priority:[number]' classes to show at larger screen sizes. Use 'wide' and 'xwide' classes to make an item bigger.</slot>
</div>

<style>
	/* if grid is not supported, only display the first item in a gallery */
	.collage > :nth-child(n + 2) {
		display: none;
	}

	@supports (display: grid) {
		.collage {
			align-items: center;
			display: grid;
			grid-gap: var(--space-narrow);
			grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
			justify-content: center;
			grid-auto-flow: dense;
		}

		.collage > :global(:nth-child(n + 2)) {
			display: unset;
		}

		.collage :global(.priority\:2) {
			display: none;
		}
	}

	@media screen and (min-width: 40em) {
		.collage :global(.priority\:2) {
			display: block;
		}
	}

	@media screen and (min-width: 30em) {
		.collage {
			grid-gap: var(--space-medium);
		}
	}

	.collage :global(.xwide) {
		grid-column: span 2;
	}

	@media screen and (min-width: 40em) {
		.collage :global(.wide) {
			grid-column: span 2;
		}

		.collage :global(.xwide) {
			grid-column: span 5;
		}
	}
</style>