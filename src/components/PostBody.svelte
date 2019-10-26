<script>
  import Figure from './Figure.svelte'
  import Gallery from './Gallery.svelte'
  import Note from './Note.svelte'
  import Passage from './Passage.svelte'
  import Wrapper from './Wrapper.svelte'

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

<style lang="scss">
  @use "config/spacing";

  .body > :global(* + *) {
    padding-top: #{spacing.get('wide')};
  }

  /* when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text */
  .section-type + .section-type {
    padding-top: #{spacing.get()};
  }
</style>

<div class="body">
  {#each sections as section, index}
    {#if section.type == 'note'}
      <div class="section-type">
        <Wrapper>
          <Note html={section.html} />
        </Wrapper>
      </div>
    {/if}

    {#if section.type == 'passage'}
      <div class="section-type">
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
        />
      </Wrapper>
    {/if}

    {#if section.type == 'gallery'}
      <Wrapper width={getWidth(section.prominence)}>
        <Gallery
          size={section.size}
          images={section.images}
          caption={section.caption}
        />
      </Wrapper>
    {/if}
  {/each}
</div>
