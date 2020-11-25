<script>
  import Figure from './Figure.svelte'

  export let sources,
    alt = '',
    caption = false,
    credit = false,
    height = 'default',
    cover = false,
    border = false

  let classes = ''
  export { classes as class }
</script>

<style type="text/scss">
  .container {
    text-align: center;
    font-size: 0;
  }

  .container {
    :global(img) {
      display: block;
      margin: 0 auto;
      max-height: 600px;
      max-height: 80vh;
      font-size: 1rem;
    }

    &.small {
      :global(img) {
        max-height: 50vh;
      }
    }

    &.fill {
    	:global(img) {
    		max-height: auto;
    		flex: 1;
    	}
    }
  }
</style>

<div
  class="container {classes}"
  class:small={height === 'small'}
  class:fill={height === 'fill'}
>
  <Figure
    {sources}
    {alt}
    {caption}
    {credit}
    {cover}
    {border}
    class="display-inline-block"
  />
</div>
