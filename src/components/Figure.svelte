<script>
  import ResponsiveImage from './ResponsiveImage.svelte'
  import Caption from './Caption.svelte'

  export let sources = '', alt = '', caption, credit, border = false

  let classes = ''
  export { classes as class }
</script>

<style type="text/scss">
  figure {
    margin: 0;
    text-align: center;
  }
</style>

<figure class={classes}>
  <slot>
    <ResponsiveImage {sources} {alt} {border} />
  </slot>
  {#if caption || credit}
    <Caption {caption} {credit} />
  {/if}
</figure>
