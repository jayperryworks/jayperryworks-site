<script>
	import Caption from './Caption.svelte';
  import Collage from './Collage.svelte';
  import DeviceFrame from './DeviceFrame.svelte';
  import Figure from './Figure.svelte';
  import Gallery from './Gallery.svelte';
  import Note from './Note.svelte';
  import Passage from './Passage.svelte';
  import ResponsiveImage from './ResponsiveImage.svelte';
  import ResponsivePicture from './ResponsivePicture.svelte';
  import Table from './Table.svelte';
  import Wrapper from './Wrapper.svelte';
  import Quote from './blocks/Quote.svelte';

	export let blocks;

	function getWidth(prominence) {
	  const widths = {
	    small: 'narrow',
	    medium: 'default',
	    large: 'wide'
	  };
	  const index = Object.keys(widths).find((item) => item == prominence);
	  return widths[index] || 'default';
	}

	function getBlockClass(type) {
		// a quote block behaves the same as a passage,
		// so assign it the same class
		if (type === 'quote') {
			type = 'passage'
		}

		const classes = [
			'passage',
			'heading'
		]

		if (classes.includes(type)) {
			return `block-${type}`
		}
	}
</script>

<div class="blocks padding-y-flow-wide">

	{#each blocks as block}
	<Wrapper
	width={getWidth(block.prominence)}
	class="{getBlockClass(block.type)}"
	>
		  {#if block.type == 'note'}
		    <Note html="{block.html}" />
		  {/if}

		  {#if block.type == 'heading'}
	      <h2>{@html block.html}</h2>
		  {/if}

		  {#if block.type == 'passage'}
	      <Passage html="{block.html}" />
		  {/if}

			{#if block.type == 'quote'}
				<Quote html="{block.html}" />
			{/if}

		  {#if block.type == 'figure'}
		  	<div class="type-align-center">
		  		{#if block.device}
		  			<Figure
		  				caption="{block.caption}"
		  				credit="{block.credit}"
		  				border="{block.border}"
	  				>
	        		<DeviceFrame
	        			type="{block.device}"
	        			image="{block.image.versions}"
	        			alt="{block.alt}"
	      			/>
	      		</Figure>
		  		{:else}
			      <Figure
			      	sources="{block.image}"
			      	alt="{block.alt}"
			      	caption="{block.caption}"
			      	credit="{block.credit}"
			      	border="{block.border}"
			      />
		      {/if}
		    </div>
		  {/if}

		  {#if block.type == 'gallery'}
	      <Figure
	      	caption="{block.caption}"
	      	credit="{block.credit}"
	      	border="{block.border}"
	      >
	        <Gallery
	        	size="{block.size}"
	        	gutter="{block.gutter}"
	        	constrainContent="{block.constrainContent || false}"
        	>
	          {#each block.images as item}
	            <li
	            	class="type-align-center"
	            	class:wide="{item.width === 'wide'}"
	            	class:xwide="{item.width === 'xwide'}"
            	>
	            	{#if item.device}
	            		<DeviceFrame
	            			type="{item.device}"
	            			image="{item.image.versions}"
	            			alt="{item.alt}"
            			/>
	            	{:else}
		              {#if item.image.versions && item.image.versions.length > 1}
		                <ResponsivePicture
		                  sources="{item.image.versions}"
		                  alt="{item.alt}"
		                  border="{item.border}"
		                />
		              {:else}
		                <ResponsiveImage
		                  sources="{item.image.versions && item.image.versions[0].sizes || item.image}"
		                  alt="{item.alt}"
		                  border="{item.border}"
		                />
		              {/if}
	              {/if}
	            </li>
	          {/each}
	        </Gallery>
	      </Figure>
		  {/if}

		  {#if block.type == 'collage'}
		  	<figure>
			  	<Collage>
			  		{#each block.images as item}
			  			<div class="{item.width || 'default'} {item.priority ? `priority:${item.priority}` : 'priority:1'}">
								{#if item.device}
									<DeviceFrame
										image="{item.image.versions}"
										alt="{item.alt}"
										type="{item.device}"
									/>
								{:else}
									<ResponsivePicture
										sources="{item.image.versions}"
										alt="{item.alt}"
										class="margin-x-auto"
									/>
								{/if}
							</div>
			  		{/each}
			  	</Collage>
		  		{#if block.caption}
		  			<Caption
		  				caption="{block.caption}"
		  				credit="{block.credit}"
		  				class="padding-top-narrow"
	  				/>
	  			{/if}
	  		</figure>
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
	      <h3 class="border-top padding-bottom-narrow padding-top type-case-upper type-font-accent type-scale-zeta">Update</h3>
	      <Passage html="{block.html}" />
		  {/if}
		</Wrapper>
	{/each}
</div>

<style>
  .blocks :global(.block-heading + .block-passage) {
    padding-top: var(--space-narrow);
  }

  /* when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text */
  .blocks :global(.block-passage + .block-passage) {
    padding-top: var(--space-medium);
  }
</style>
