<script>
  import Figure from './Figure.svelte'

  export let sources,
    alt = '',
    caption = false,
    credit = false

  let classes = ''
  export { classes as class }
</script>

<style>
  .container {
    text-align: center;
    font-size: 0;
  }

  .container :global(img) {
    display: block;
    margin: 0 auto;
    max-height: 600px;
    max-height: 80vh;
    font-size: 1rem;
  }
</style>

<div class="container {classes}">
  <Figure {sources} {alt} {caption} {credit} class="display-inline-block" />
</div>
