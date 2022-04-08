<script>
  export let blurbWidth = 20,
    bodyWidth = 'default'

  let classes = '',
    blurbClasses = '',
    bodyClasses = ''

  export {
    classes as class,
    blurbClasses as blurbClass,
    bodyClasses as bodyClass
  }

  $: blurbWidthValue = setWidthValue(blurbWidth)
  $: bodyWidthValue = setWidthValue(bodyWidth)

  function setWidthValue(width) {
    return typeof width == 'number'
      ? `${width}rem`
      : `var(--layout-w-${width})`
  }
</script>

<section
  class="outdent {classes}"
  style={`
    --blurb-width: ${blurbWidthValue};
    --breakpoint: calc(
        ${blurbWidthValue} + (
          (${bodyWidthValue} + ${blurbWidthValue}) / 2
        )
      );
    --max-width: calc(${bodyWidthValue} + ${blurbWidthValue})
  `}
>
  <header class="blurb {blurbClasses}">
    <slot name="blurb"></slot>
  </header>
  <div class="body {bodyClasses}">
    <slot name="body"></slot>
  </div>
</section>

<style>
  .outdent {
    --blurb-width: 30rem;
    --breakpoint: var(--breakpoint-large);

    display: block;
    font-size: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 64rem; /* fallback width */
    max-width: var(--max-width);
  }

  .blurb,
  .body {
    display: inline-block;
    font-size: 1rem;
    max-width: 100%;
    width: 100%;
    vertical-align: top;
  }

  @media screen and (min-width: 30em) {
    .blurb {
      min-width: var(--blurb-width);
      width: calc((var(--breakpoint) - 100%) * 1000);
    }

    .body {
      min-width: calc(100% - var(--blurb-width));
      width: calc((var(--breakpoint) - 100%) * 1000);
    }
  }
</style>
