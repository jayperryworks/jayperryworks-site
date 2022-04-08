<script>
  export let breakpoint = 'none',
    align = 'center',
    fillSide = 'left'

  let classes = ''
  export {classes as class}

  $: breakpointClass = breakpoint !== 'none'
    ? `${breakpoint}:horizontal`
    : 'horizontal'
</script>

<div
  class="bookend {breakpointClass} {classes}"
  class:align-top="{align === 'top'}"
  class:align-stretch="{align === 'stretch'}"
>
  <div
    class="item left"
    class:fill="{fillSide === 'left' || fillSide === 'both'}"
  >
    <slot name="left"></slot>
  </div>
  <div
    class="item right"
    class:fill="{fillSide === 'right' || fillSide === 'both'}"
  >
    <slot name="right"></slot>
  </div>
</div>

<style>
  .bookend {
    display: block;
    position: relative;
  }

  @supports (display: grid) {
    .horizontal {
      align-items: center;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .horizontal.align-top {
      align-items: top;
    }

    .horizontal.align-stretch {
      align-items: stretch;
    }

    .horizontal.align-stretch .item {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .horizontal .item.right {
      text-align: right;
    }

    .horizontal .item.fill {
      flex: 1;
    }

    /* TODO find a better way to do this */
    @media screen and (max-width:  42em) {
      .horizontal {
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .horizontal.align-top {
        align-items: top;
      }

      .horizontal.align-stretch {
        align-items: stretch;
      }

      .horizontal.align-stretch .item {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .horizontal .item.right {
        text-align: right;
      }

      .horizontal .item.fill {
        flex: 1;
      }
    }
  }
</style>
