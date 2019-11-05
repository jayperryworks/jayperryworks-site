<script>
  export let breakpoint = 'small',
    align = 'middle',
    fillSide = 'left'

  let classes = ''
  export {classes as class}

  $: horizontalClass = breakpoint == 'none' ? 'horizontal' : `horizontal@${breakpoint}`
</script>

<style lang="scss">
  @use 'config/breakpoints';
  @use 'bourbon';

  .container {
    display: block;
    position: relative;
  }

  .item {
    @include bourbon.clearfix;
    clear: both;
    display: block;
    float: none;
    position: relative;
    vertical-align: middle;
  }

  .align-top {
    @supports (align-items: flex-start) {
      align-items: flex-start !important;
    }

    .item {
      vertical-align: top;
    }
  }

  @include breakpoints.suffix(
    '.horizontal',
    $default: true,
    $sizes: [xsmall, small, medium, large]
  ) {
    @supports (display: flex) {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .item {
      display: inline-block;
      vertical-align: middle;

      &.left {
        float: left;

        @supports (display: flex) {
          float: none;
        }
      }

      &.right {
        float: right;
        text-align: right;

        @supports (display: flex) {
          float: none;
          margin-left: auto;
        }
      }

      &.fill {
        @supports (flex: 1) {
          flex: 1;
        }
      }
    }
  }


</style>

<div class="container {horizontalClass} {classes}" class:align-top="{align === 'top'}">
  <div class="item left" class:fill="{fillSide === 'left'}">
    <slot name="left"></slot>
  </div>
  <div class="item right" class:fill="{fillSide === 'right'}">
    <slot name="right"></slot>
  </div>
</div>
