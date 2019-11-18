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
    border = false

  $: srcset = sources.length > 0 && sources.splice(1, 1).map((source) => {
      if (source.size) {
        return `${source.path} ${source.size}w`
      }
      return source.path
    }).join(', ')

  let classes = ''
  export { classes as class }
</script>

<style type="text/scss">
  img {
    display: inline-block;
    max-width: 100%;
  }
</style>

<img
  class="{classes} {border ? 'border border-solid' : ''}"
  src={sources ? sources[0].path : ''}
  {srcset}
  alt={alt}
>
