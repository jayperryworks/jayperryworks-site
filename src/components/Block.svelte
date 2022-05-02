<script lang="ts">
// block components
import Passage from '@blocks/Passage.svelte';
import Figure from '@blocks/Figure.svelte';

// other components
import ContentWrapper from '@components/ContentWrapper.svelte';

// typescript
import { SvelteComponent } from 'svelte';

export let block: SvelteComponent;

let className = '';
export { className as class };

function getWidth(prominence) {
	const widths = {
		small: 'narrow',
		medium: 'default',
		large: 'wide',
	};
	const index = Object.keys(widths).find((item) => item == prominence);
	return widths[index] || 'default';
}

function getBlockClass(type) {
	// a quote block behaves the same as a passage,
	// so assign it the same class
	if (type === 'quote') {
		type = 'passage';
	}

	const classes = [
		'passage',
		'heading',
	];

	if (classes.includes(type)) {
		return `block-${type}`;
	}

	return '';
}
</script>

<ContentWrapper
	width={getWidth(block.prominence)}
	class="{getBlockClass(block.type)} {className}"
>
	<!-- passage -->
	{#if block.type === 'passage'}
		<Passage {...block} />
	{/if}

	<!-- figure -->
  {#if block.type === 'figure'}
		<Figure {...block} />
	{/if}
</ContentWrapper>

<style>
	.blocks :global(.block-heading + .block-passage) {
    padding-top: var(--space-narrow);
  }

  /* when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text */
  .blocks :global(.block-passage + .block-passage) {
    padding-top: var(--space-medium);
  }
</style>
