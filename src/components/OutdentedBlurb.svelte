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

<style type="text/scss">
  @use 'config/layout_width';
  @use 'config/breakpoints' as bp;

  $breakpoint: bp.get('large');
  $blurb-width: 30rem;
  $max-width: 'wide';

  .outdent {
    --blurb-width: #{$blurb-width};
    --breakpoint: #{$breakpoint};
    --max-width: var(--layout-w-#{$max-width});

    display: block;
    font-size: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: layout_width.get($max-width); /* fallback width */
    max-width: var(--max-width);
  }

  .blurb,
  .body {
    display: inline-block;
    font-size: 1rem;
    max-width: 100%;
    vertical-align: top;
  }

  .blurb {
    width: 100%;

    @include bp.query('>xsmall') {
      min-width: var(--blurb-width);
      width: calc((var(--breakpoint) - 100%) * 1000);
    }
  }

  .body {
    width: 100%;

    @include bp.query('>xsmall') {
      min-width: calc(100% - var(--blurb-width));
      width: calc((var(--breakpoint) - 100%) * 1000);
    }
  }
</style>

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
