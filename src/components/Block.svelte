<script lang="ts">
	import Passage from '@blocks/Passage.svelte';
	import Figure from '@blocks/Figure.svelte';
	import ContentWrapper from '@components/ContentWrapper.svelte';
	import { SvelteComponent } from 'svelte';

	export let block: SvelteComponent;
</script>

<ContentWrapper width={block.prominence || 'default'}>
	<!-- passage -->
	{#if block.type === 'passage'}
		<Passage {...block} />
	{/if}

	<!-- figure -->
  {#if block.type === 'figure'}
		<Figure {...block} />
	{/if}
</ContentWrapper>
