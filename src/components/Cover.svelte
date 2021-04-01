<script>
	import Figure from './Figure.svelte'

	export let sources,
		alt = '',
		caption = false,
		credit = false,
		height = 'default',
		cover = false,
		border = false

	let classes = ''
	export { classes as class }
</script>

<div class="container {classes}">
	<Figure
		{sources}
		{alt}
		{caption}
		{credit}
		{cover}
		{border}
		class="display-inline-block"
	/>
</div>

<style>
	.container {
		text-align: center;
		font-size: 0;
	}

	.container :global(img) {
		display: block;
		margin: 0 auto;
		max-height: 600px;
		max-height: 80vh;
		font-size: 1rem;
	}
</style>
