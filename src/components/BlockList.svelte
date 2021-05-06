<script>
	import Caption from './Caption.svelte'
  import Figure from './Figure.svelte'
  import Gallery from './Gallery.svelte'
  import Note from './Note.svelte'
  import Passage from './Passage.svelte'
  import ResponsiveImage from './ResponsiveImage.svelte'
  import ResponsivePicture from './ResponsivePicture.svelte'
  import Table from './Table.svelte'
  import Wrapper from './Wrapper.svelte'

		export let blocks

		function getWidth(prominence) {
		  const widths = {
		    small: 'narrow',
		    medium: 'default',
		    large: 'wide'
		  }
		  const index = Object.keys(widths).find((item) => item == prominence)
		  return widths[index] || 'default'
		}
</script>

<div class="blocks padding-y-flow-wide">
	{#each blocks as block}
		<Wrapper
		  width={getWidth(block.prominence)}
		  class="block-{block.type === 'heading' ? 'heading' : 'text'}"
		>
		  {#if block.type == 'note'}
		    <Note html={block.html} />
		  {/if}

		  {#if block.type == 'heading'}
	      <h2>{@html block.html}</h2>
		  {/if}

		  {#if block.type == 'passage'}
	      <Passage
	        html={block.html}
	        lead={block.dropCap}
	      />
		  {/if}

		  {#if block.type == 'figure'}
		  	<div class="t-align-center">
		      <Figure
		      	sources={block.image}
		      	alt={block.alt}
		      	caption={block.caption}
		      	credit={block.credit}
		      	border={block.border}
		      />
		    </div>
		  {/if}

		  {#if block.type == 'gallery'}
	      <Figure
	      	sources={block.image}
	      	alt={block.alt}
	      	caption={block.caption}
	      	credit={block.credit}
	      	border={block.border}
	      >
	        <Gallery size={block.size}>
	          {#each block.images as item}
	            <li class="t-align-center">
	              {#if item.image.versions && item.image.versions.length > 1}
	                <ResponsivePicture
	                  sources={item.image.versions}
	                  alt={item.alt}
	                  border={item.border}
	                />
	              {:else}
	                <ResponsiveImage
	                  sources={item.image.versions && item.image.versions[0].sizes || item.image}
	                  alt={item.alt}
	                  border={item.border}
	                />
	              {/if}
	            </li>
	          {/each}
	        </Gallery>
	      </Figure>
		  {/if}

		  {#if block.type == 'table'}
	      <Table
	        headingColumns={block.keyColumns}
	        header={block.header}
	        body={block.body}
	        footer={block.footer}
	      />
		  {/if}

		  {#if block.type == 'update'}
	      <h3 class="border-top padding-bottom-narrow padding-top t-case-upper t-font-accent t-scale-zeta t-weight-bold">Update</h3>
	      <Passage html={block.html} />
		  {/if}
		</Wrapper>
	{/each}
</div>

<style>
  .blocks :global(.block-heading + .block-text) {
    padding-top: var(--space-narrow);
  }

  /* when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text */
  .blocks :global(.block-text + .block-text) {
    padding-top: var(--space-medium);
  }
</style>