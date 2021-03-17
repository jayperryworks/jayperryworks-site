<script>
	import arrow from 'icons/arrow-right.svg'
	import Button from '@/components/Button.svelte'
	import Passage from '@/components/Passage.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let link, // url the panel should point to
		heading, // the title, e.g. "Blog"
		cta,
		intro, // intro blurb
		number // sequence number, e.g. 01

	// append additional classes as needed
	let classes = ''
	export { classes as class }

	$: formattedNumber = number.toString().padStart(2, 0)
</script>

<style>
	article {
		min-height: 100vh;
	}
</style>

<article class="border-seam-top | padding-y-xwide padding-x-outside | display-flex display-flex-column | {classes}">
	<header class="padding-bottom-wide">
		<Wrapper width="xwide">
			<a
				class="display-block | t-scale-gamma t-font-accent t-link-undecorated | c-fg-tertiary | padding-bottom-narrow"
				href={link}
			>
				{formattedNumber}
			</a>
			<h2 class="padding-bottom-wide | t-scale-alpha">
				<a href={link}>{heading}</a>
			</h2>
			{#if intro}
				<Wrapper centered={false} class="padding-bottom-wide">
					<Passage html={intro}/>
				</Wrapper>
			{/if}
			{#if cta}
				<Button
					prefetch={true}
					href={cta.link}
					iconRight={arrow}
				>
					{cta.label}
				</Button>
			{/if}
		</Wrapper>
	</header>
	<slot></slot>
</article>
