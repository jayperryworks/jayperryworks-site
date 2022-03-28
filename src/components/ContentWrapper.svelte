<!--
  Wrapper
  -> a container that constrains the layout width, centers content on
     larger screens
  -> note that a wrapper should never have horizontal padding, because it
     needs to set a layout width and padding will make the content narrower.
     Instead, add padding to a parent container.
-->
<script>
  export let width = 'default'
  export let centered = true
  export let flex = false

  let className = ''
  export { className as class }

  $: widthClass = width === 'default' ? 'content-width' : `content-width-${width}`
</script>

<div
  class="wrapper {widthClass} {className}"
  class:centered
  class:flex
>
  <slot />
</div>

<style>
  .wrapper {
    position: relative;
  }

  .centered {
    margin-left: auto;
    margin-right: auto;
  }

  @supports (display: flex) and (align-self: center) {
    .flex {
      width: 100%;
      align-self: center;
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
