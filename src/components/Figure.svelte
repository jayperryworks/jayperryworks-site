<script>
  import ResponsiveImage from './ResponsiveImage.svelte'

  export let sources, alt, caption

  let classes = ''
  export { classes as class }
</script>

<style lang="scss">
  figure {
    margin: 0;
  }
</style>

<figure class={classes}>
  <ResponsiveImage {sources} {alt} />
  {#if caption}
    <figcaption>{@html caption}</figcaption>
  {/if}
</figure>
