<!--
  An image tag with an (optional) srcset attribute

  sources = [
    {
      path: (STRING: path to file)
      size: (NUMBER or STRING: width of image)
    }
  ]
-->
<script>
  export let sources = '',
    alt = '',
    border = false,
    contain = false,
    cover = false

  $: src = sources.length > 0 ? sources[0].path : ''

  $: srcset = sources.length > 0
    ? sources.slice(1).map((source) => {
        if (source.size) {
          return `${source.path} ${source.size}w`
        }
        return source.path
      }).join(', ')
    : ''

  $: borderClass = border ? 'border border-solid' : ''

  let classes = ''
  export { classes as class }
</script>

<style type="text/scss">
  img {
    display: inline-block;
    max-width: 100%;
    object-fit: scale-down;
  }

  .contain {
    object-fit: contain;
  }

  .cover {
    object-fit: cover;
  }
</style>

<img
  class="{borderClass} {classes}"
  class:contain
  class:cover
  {src}
  {srcset}
  {alt}
/>
