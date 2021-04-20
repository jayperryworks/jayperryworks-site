<script>
	import arrow from 'icons/arrow-right.svg'
	import Button from '@/components/Button.svelte'
	import Passage from '@/components/Passage.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let link, // url the panel should point to
		heading, // the title, e.g. "Blog"
		id, // the id attribute for the container, e.g. "blog"
		number // sequence number, e.g. 01

	// append additional classes as needed
	let classes = ''
	export { classes as class }

	$: formattedNumber = number.toString().padStart(2, 0)
</script>

<article 
	class="border-seam-top | padding-y-xwide padding-x-outside | display-flex display-flex-column | {classes}"
	id={id}
>
	<header class="padding-bottom-wide">
		<Wrapper width="xwide">
			<a
				class="display-block | t-scale-gamma t-font-accent t-link-undecorated | c-fg-tertiary | padding-bottom-narrow"
				href={link}
			>
				{formattedNumber}
			</a>
			<h2 class="t-scale-alpha">
				<a href={link}>{heading}</a>
			</h2>
		</Wrapper>
	</header>
	<slot></slot>
</article>

<style>
	@supports (display: flex) {
		article {
			min-height: 100vh;
		}
	}
</style>
