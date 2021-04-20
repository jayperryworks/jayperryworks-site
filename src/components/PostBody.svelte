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

  export let sections, dropCap = true

  $: firstPassage = sections.find((section) => section.type == 'passage')

  function getWidth(prominence) {
    const widths = {
      small: 'narrow',
      medium: 'default',
      large: 'wide'
    }
    return widths[Object.keys(widths).find((item) => item == prominence)]
  }
</script>

<div class="body">
  {#each sections as section, index}
    {#if section.type == 'note'}
      <Wrapper class="section-text">
        <Note html={section.html} />
      </Wrapper>
    {/if}

    {#if section.type == 'heading'}
      <Wrapper class="section-heading">
        <h2>{@html section.html}</h2>
      </Wrapper>
    {/if}

    {#if section.type == 'passage'}
      <Wrapper class="section-text">
        <Passage
        	html={section.html}
        	lead={dropCap && section == firstPassage}
      	/>
      </Wrapper>
    {/if}

    {#if section.type == 'figure'}
      <Wrapper width={getWidth(section.prominence)} class="t-align-center">
        <Figure
          sources={section.image}
          alt={section.alt}
          caption={section.caption}
          credit={section.credit}
          border={section.border}
        />
      </Wrapper>
    {/if}

    {#if section.type == 'gallery'}
      <Wrapper width={getWidth(section.prominence)}>
        <Figure
          caption={section.caption}
          credit={section.credit}
        >
          <Gallery size={section.size}>
            {#each section.images as item}
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
      </Wrapper>
    {/if}

    {#if section.type == 'table'}
      <Wrapper width={getWidth(section.prominence)}>
        <Table
          headingColumns={section.keyColumns}
          header={section.header}
          body={section.body}
          footer={section.footer}
        />
      </Wrapper>
    {/if}

    {#if section.type == 'update'}
      <Wrapper class="section-text">
        <h3 class="border-top padding-bottom-narrow padding-top t-case-upper t-font-accent t-scale-zeta t-weight-bold">Update</h3>
        <Passage html={section.html} />
      </Wrapper>
    {/if}
  {/each}
</div>

<style type="text/scss">
  .body > :global(* + *) {
    padding-top: var(--space-wide);
  }

  .body :global(.section-heading + .section-text) {
    padding-top: var(--space-narrow);
  }

  // when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text
  .body :global(.section-text + .section-text) {
    padding-top: var(--space-medium);
  }
</style>
