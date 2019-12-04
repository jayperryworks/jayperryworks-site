<script>
  import ResponsiveImage from './ResponsiveImage.svelte'
  import Caption from './Caption.svelte'

  export let sources = '',
    alt = '',
    caption = false,
    credit = false,
    border = false,
    cover = false

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
    <ResponsiveImage {sources} {alt} {border} {cover} />
  </slot>
  {#if caption || credit}
    <Caption {caption} {credit} />
  {/if}
</figure>
