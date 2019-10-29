<script>
  export let breakpoint = 'small'
  export let align = 'middle'

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
      align-items: flex-start;
    }

    .item {
      vertical-align: top;
    }
  }

  @include breakpoints.suffix(
    '.horizontal',
    $default: true,
    $sizes: [small, medium, large]
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

      &.center {
        text-align: center;

        @supports (display: flex) {
          flex: 1;
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
    }
  }


</style>

<div class="container {horizontalClass}">
  <div class="item left">
    <slot name="left"></slot>
  </div>
  <div class="item center">
    <slot name="center"></slot>
  </div>
  <div class="item right">
    <slot name="right"></slot>
  </div>
</div>
