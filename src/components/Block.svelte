<script lang="ts">
	// block components
	import Passage from '@blocks/Passage.svelte';
	import Figure from '@blocks/Figure.svelte';

	// other components
	import Markdown from '@components/Markdown.svelte';
	import ContentWrapper from '@components/ContentWrapper.svelte';

	// typescript
	import { SvelteComponent } from 'svelte';

	export let block: SvelteComponent;

	let className = '';
	export { className as class };
</script>

<ContentWrapper
	width={block.prominence || 'default'}
	class={className}
>
	<!-- passage -->
	{#if block.type === 'passage'}
		<Passage {...block}>
			{#if block.html}
				{block.html}
			{/if}

			{#if block.markdown}
				<Markdown source={block.markdown} />
			{/if}
		</Passage>
	{/if}

	<!-- figure -->
  {#if block.type === 'figure'}
		<Figure {...block} />
	{/if}
</ContentWrapper>
