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

<style type="text/scss">
  @use "config/layout_width";

  .wrapper {
    position: relative;
  }

  .flex {
  	width: 100%;
  }

  .centered {
    margin-left: auto;
    margin-right: auto;

    .flex {
    	@supports (display: flex) and (align-self: center) {
    		align-self: center;
    		margin-left: 0;
    		margin-right: 0;
    	}
    }
  }

  @each $name, $w in layout_width.$list {
    .#{$name} {
      max-width: layout_width.get($name);
    }
  }
</style>

<div
  class="wrapper {width} {classes}"
  class:centered
  class:flex
>
  <slot />
</div>
