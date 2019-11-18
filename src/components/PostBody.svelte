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

  .body > :global(* + *) {
    padding-top: #{spacing.get('wide')};
  }

  // when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text
  .section-text + .section-text {
    padding-top: #{spacing.get()};
  }
</style>

<div class="body">
  {#each sections as section, index}
    {#if section.type == 'note'}
      <div class="section-text">
        <Wrapper>
          <Note html={section.html} />
        </Wrapper>
      </div>
    {/if}

    {#if section.type == 'passage'}
      <div class="section-text">
        <Wrapper>
          <Passage html={section.html} lead={section == firstPassage} />
        </Wrapper>
      </div>
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
  {/each}
</div>
