<script>
  import ResponsiveImage from './ResponsiveImage.svelte'

  export let sources, alt, prominence, caption = null
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
