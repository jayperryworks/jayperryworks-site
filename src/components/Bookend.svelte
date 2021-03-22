<script>
  export let breakpoint = 'small',
    align = 'middle',
    fillSide = 'left',
    itemWidth = false

  let classes = ''
  export {classes as class}

  $: horizontalClass = breakpoint == 'none'
    ? 'horizontal'
    : `horizontal@${breakpoint}`

  $: itemWidthStyle = itemWidth
    ? `--item-width: ${itemWidth};`
    : ''
</script>

<div
  class="bookend {horizontalClass} {classes}"
  class:align-top={align === 'top'}
  class:align-stretch={align === 'stretch'}
>
  <div
    class="item left"
    class:fill="{fillSide === 'left' || fillSide === 'both'}"
    style={itemWidthStyle}
  >
    <slot name="left"></slot>
  </div>
  <div
    class="item right"
    class:fill="{fillSide === 'right' || fillSide === 'both'}"
    style={itemWidthStyle}
  >
    <slot name="right"></slot>
  </div>
</div>

<style type="text/scss">
  @use 'config/breakpoints';
  @use 'bourbon';

  .bookend {
    display: block;
    position: relative;
  }

  .item {
    --item-width: auto;

    @include bourbon.clearfix;
    clear: both;
    display: block;
    float: none;
    position: relative;
    vertical-align: middle;
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

    &.align-top {
      @supports (align-items: flex-start) {
        align-items: flex-start !important;
      }

      .item {
        vertical-align: top;
      }
    }

    &.align-stretch {
      @supports (align-items: flex-start) {
        align-items: stretch !important;
      }

      .item {
        max-width: var(--item-width);
        vertical-align: top;

        @supports (display: flex) {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      }
    }
  }
</style>
