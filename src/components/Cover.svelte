<script>
  import Figure from './Figure.svelte'

  export let sources, alt, caption, credit

  let classes = ''
  export { classes as class }
</script>

<style lang="scss">
  .container :global(img) {
    display: block;
    margin: 0 auto;
    max-height: 600px;
    max-height: 80vh;
  }
</style>

<div class="container {classes}">
  <Figure {sources} {alt} {caption} {credit} class="display-inline-block" />
</div>
