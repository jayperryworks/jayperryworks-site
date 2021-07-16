<script>
	import ResponsiveImage from './ResponsiveImage.svelte'
	import ResponsivePicture from './ResponsivePicture.svelte'
	import Caption from './Caption.svelte'

	export let sources = '',
		alt = '',
		caption = false,
		credit = false,
		border = false,
		cover = false

	let classes = ''
	export { classes as class }
</script>

<figure class={classes}>
	<slot>
		<ResponsivePicture
			sources="{sources.versions}"
			{alt}
			{border}
			{cover}
		/>
	</slot>
	{#if caption || credit}
		<Caption {caption} {credit} />
	{/if}
</figure>

<style>
	figure {
		margin: 0;
		text-align: center;
	}
</style>