<script>
  export let figureSize = 'default',
    el = 'figure',
    spacing = 'default',
    breakpoint = false

  let classes = ''
  export {classes as class}
</script>

<style type="text/scss">
  @use 'config/type';

  $breakpoint: 880px; // use px here because rem causes jank due to root type scaling
  $figure-w: 76%;

  .card {
    --breakpoint: #{$breakpoint};
    --figure-width: #{$figure-w};

    display: block;
    font-size: 0;
    overflow: hidden;
  }

  .figure,
  .content {
    @include type.size-default;
    display: inline-block;
    max-width: 100%;
    vertical-align: top;
  }

  .figure {
    min-width: $figure-w;
    min-width: var(--figure-width);
    width: 100%; // fallback value if calc() isn't supported
    width: calc((#{$breakpoint} - 100%) * 1000);
    width: calc((var(--breakpoint) - 100%) * 1000);
    text-align: center;
  }

  .content {
    max-width: 100%;
    min-width: (100% - $figure-w);
    min-width: calc(100% - var(--figure-width));
    width: 100%; // fallback value if calc() isn't supported
    width: calc((#{$breakpoint} - 100%) * 1000);
    width: calc((var(--breakpoint) - 100%) * 1000);
  }

  /* --- modifiers --- */
  .card.small {
    $breakpoint: 480px;
    $figure-w: 23%;

    --breakpoint: #{$breakpoint};
    --figure-width: #{$figure-w};

    .figure {
      min-width: $figure-w;
      width: calc((#{$breakpoint} - 100%) * 1000);
    }

    .content {
      min-width: (100% - $figure-w);
      width: calc((#{$breakpoint} - 100%) * 1000);
    }
  }
</style>

<div
  class="overflow-hidden"
  style={breakpoint ? `--breakpoint: ${breakpoint};` : ''}
>
  {#if el == 'figure'}
    <figure
      class="card gutter-wrapper {classes}"
      class:small={figureSize !== 'default'}
      style={breakpoint ? `--breakpoint: ${breakpoint}` : ''}
    >
      <div class="figure gutter">
        <slot name="figure"></slot>
      </div>
      <figcaption class="content gutter">
        <slot name="content"></slot>
      </figcaption>
    </figure>
  {:else}
    <aside
      class="card gutter-wrapper {classes}"
      class:small={figureSize !== 'default'}
      style={breakpoint ? `--breakpoint: ${breakpoint}` : ''}
    >
      <div class="figure gutter">
        <slot name="figure"></slot>
      </div>
      <div class="content gutter">
        <slot name="content"></slot>
      </div>
    </aside>
  {/if}
</div>
