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

  let classes = ''
  export { classes as class }
</script>

<div
  class="wrapper {width} {classes}"
  class:centered
  class:flex
>
  <slot />
</div>

<style>
  .wrapper {
    position: relative;
  }

  .narrow {
    max-width: 30rem;
  }

  .default {
    max-width: 30rem;
  }

  .wide {
    max-width: 64rem;
  }

  .xwide {
    max-width: 75rem;
  }

  .xxwide {
    max-width: 112rem;
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
