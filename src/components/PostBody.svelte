<script>
  import Passage from './Passage.svelte'
  import Figure from './Figure.svelte'
  import Gallery from './Gallery.svelte'

  export let sections
</script>

{#each sections as section}
  {#if section.type == 'passage'}
    <Passage {...section} />
  {/if}

  {#if section.type == 'figure'}
    <Figure {...section} />
  {/if}

  {#if section.type == 'gallery'}
    <Gallery {...section} />
  {/if}
{/each}
