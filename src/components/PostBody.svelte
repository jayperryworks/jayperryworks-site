<script>
  import Passage from './Passage.svelte'
  import Figure from './Figure.svelte'
  import Gallery from './Gallery.svelte'
  import Wrapper from './Wrapper.svelte'

  export let sections

  function setWidth(prominence) {
    const widths = {
      small: 'narrow',
      medium: 'default',
      large: 'wide'
    }
    return widths[Object.keys(widths).find((item) => item == prominence)]
  }
</script>

{#each sections as section}
  {#if section.type == 'passage'}
    <Wrapper>
      <Passage html={section.html} />
    </Wrapper>
  {/if}

  {#if section.type == 'figure'}
    <Wrapper width={setWidth(section.prominence)} class="t-align-center">
      <Figure
        sources={section.sources}
        alt={section.alt}
        prominence={section.prominence}
        caption={section.caption}
      />
    </Wrapper>
  {/if}

  {#if section.type == 'gallery'}
    <Wrapper width={setWidth(section.prominence)}>
      <Gallery
        size={section.size}
        images={section.images}
        caption={section.caption}
        prominence={section.prominence}
      />
    </Wrapper>
  {/if}
{/each}
