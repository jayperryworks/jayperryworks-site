<script context="module">
	export async function preload() {
		const response = await this.fetch('about.json')
		const content = await response.json()

		if (response.status !== 200) {
			this.error(response.status, content.message)
			return
		}

		return { content }
	}
</script>

<script>
	import Cover from '@/components/Cover.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import PageTheme from '@/components/PageTheme.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import PostBody from '@/components/PostBody.svelte'
	import ResponsiveImage from '@/components/ResponsiveImage.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	// blocks
	import Passage from '@/components/Passage.svelte'

	export let content
	let { title, subtitle, body } = content
	export let highlight = null

	function getWidth(prominence) {
	  const widths = {
	    small: 'narrow',
	    medium: 'default',
	    large: 'wide'
	  }
	  const index = Object.keys(widths).find((item) => item == prominence)
	  return widths[index] || 'default'
	}

	function getBlockClass(type) {
		const classes = [
			'passage',
			'heading'
		]

		if (classes.includes(type)) {
			return `block-${type}`
		}
	}
</script>

<PageTitle title="Profile" />
<PageTheme color="{highlight}" />

<MainNav segment="about" />
<main>
	<article class="
		padding-x-outside
		padding-y-xwide
	">
		<header>
			<Wrapper width="wide"class="padding-bottom-wide">
				<h1>{title}</h1>
				{#if subtitle}
					<p class="subtitle padding-top-xxnarrow type-font-accent type-weight-xlight color-fg-secondary type-scale-beta">
						{subtitle}
					</p>
				{/if}
			</Wrapper>
		</header>

		<!-- <PostBody blocks={content.body} /> -->
		{#each body as slice}
			<Wrapper
				width="{getWidth(slice.primary.prominence)}"
				class="{getBlockClass(slice.type)}"
			>
				{#if slice.type === 'passage'}
					<Passage html="{slice.primary.html}" />
				{/if}
			</Wrapper>
		{/each}
	</article>
</main>

<style>
	@media screen and (min-width: 40em) {
		h1, .subtitle {
			text-align: center;
		}
	}
</style>
