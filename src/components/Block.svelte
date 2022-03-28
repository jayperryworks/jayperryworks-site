<script>
	import Passage from './blocks/Passage.svelte';
	import Figure from './blocks/Figure.svelte';
	import ContentWrapper from './ContentWrapper.svelte';

	export let block;
</script>

<ContentWrapper width={block.prominence || 'default'}>
	{#if block.type === 'passage'}
		<Passage {...block} />
	{/if}


  {#if block.type === 'figure'}
		<Figure {...block} />
	{/if}
</ContentWrapper>
