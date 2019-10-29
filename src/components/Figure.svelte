<script>
  import ResponsiveImage from './ResponsiveImage.svelte'

  export let sources, alt, caption, credit

  export let hideBorder = false

  let classes = ''
  export { classes as class }
</script>

<style lang="scss">
  figure {
    margin: 0;
    text-align: center;
  }
</style>

<figure class={classes}>
  <ResponsiveImage {sources} {alt} class={hideBorder ? '' : 'border border-solid'} />
  {#if caption || credit}
    <figcaption class="
      t-caption
      t-align-left
    ">
      {@html caption}
      {#if credit}
        <cite class="t-small">{@html credit}</cite>
      {/if}
    </figcaption>
  {/if}
</figure>
