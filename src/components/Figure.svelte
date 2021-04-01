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

	$: versions = sources.versions && sources.versions.length > 1
</script>

<figure class={classes}>
	<slot>
		{#if versions}
			<ResponsivePicture
				sources="{sources.versions}"
				{alt}
				{border}
				{cover}
			/>
		{:else}
			<ResponsiveImage
				sources="{sources.versions && sources.versions[0].sizes || sources}"
				{alt}
				{border}
				{cover}
			/>
		{/if}
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