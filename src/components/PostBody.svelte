<script>
  import Caption from './Caption.svelte'
  import Figure from './Figure.svelte'
  import Gallery from './Gallery.svelte'
  import Note from './Note.svelte'
  import Passage from './Passage.svelte'
  import Table from './Table.svelte'
  import Wrapper from './Wrapper.svelte'
  import ResponsiveImage from './ResponsiveImage.svelte'

  export let sections

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

<style type="text/scss">
  @use "config/spacing";

  .body {
    > :global(* + *) {
      padding-top: spacing.get('wide');
    }

    :global(.section-heading + .section-text) {
      padding-top: spacing.get('narrow');
    }

    // when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text
    :global(.section-text + .section-text) {
      padding-top: spacing.get();
    }
  }
</style>

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
        <Passage html={section.html} lead={section == firstPassage} />
      </Wrapper>
    {/if}

    {#if section.type == 'figure'}
      <Wrapper width={getWidth(section.prominence)} class="t-align-center">
        <Figure
          sources={section.sources}
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
            {#each section.images as image}
              <li>
                <ResponsiveImage
                  sources={image.sources}
                  alt={image.alt}
                  border={image.border}
                />
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
      <Wrapper class="border-top section-text">
        <h3 class="
          padding-bottom-narrow
          padding-top
          t-case-upper
          t-font-accent
          t-scale-zeta
          t-weight-bold
        ">Update</h3>
        <Passage html={section.html} />
      </Wrapper>
    {/if}
  {/each}
</div>
