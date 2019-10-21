<script>
  import ResponsiveImage from './ResponsiveImage.svelte'

  export let sources
  export let alt
  export let caption
  export let prominence
</script>

<style lang="scss">
  figure {
    margin: 0;
  }
</style>

<figure>
  <ResponsiveImage {sources} {alt} />
  {#if caption}
    <figcaption>{@html caption}</figcaption>
  {/if}
</figure>
