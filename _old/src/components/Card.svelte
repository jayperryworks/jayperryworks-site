<script>
  export let figureSize = false,
    el = 'figure',
    spacing = false,
    breakpoint = false

  let classes = ''
  export {classes as class}

  $: gutterClass = spacing ? `gutter-${spacing}` : ''
</script>

<div
  class="overflow-hidden"
  style={breakpoint ? `--breakpoint: ${breakpoint};` : ''}
>
  {#if el == 'figure'}
    <figure
      class="card gutter-wrapper {gutterClass} {figureSize} {classes}"
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
      class="card gutter-wrapper {gutterClass} {figureSize} {classes}"
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

<style>
  .card {
    --breakpoint: 880px;
    --figure-width: 76%;

    display: block;
    font-size: 0;
    overflow: hidden;
  }

  .figure,
  .content {
    display: inline-block;
    font-size: 1rem;
    max-width: 100%;
    vertical-align: top;
  }

  .figure {
    min-width: var(--figure-width);
    width: 100%; /* fallback value if calc() isn't supported */
    width: calc((var(--breakpoint) - 100%) * 1000);
    text-align: center;
  }

  .content {
    min-width: calc(100% - var(--figure-width));
    width: 100%; /* fallback value if calc() isn't supported */
    width: calc((var(--breakpoint) - 100%) * 1000);
  }

  /* --- modifiers --- */
  .card.small {
    --breakpoint: 480px;
    --figure-width: 23%;
  }
</style>