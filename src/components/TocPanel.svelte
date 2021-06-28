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
	class="border-seam-top | padding-y-xwide padding-x-outside | {classes}"
	id={id}
>
	<header class="padding-bottom-wide">
		<Wrapper width="xwide">
			<a
				class="number type-scale-gamma type-font-accent type-link-undecorated | color-fg-secondary | padding-bottom-narrow"
				href={link}
			>
				{formattedNumber}
			</a>
			<h2 class="type-scale-alpha">
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
			display: flex;
			flex-direction: column;
		}
	}

	.number {
		display: block;
	}
</style>
