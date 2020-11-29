<script>
  export let size = '',
    gutter = 'xnarrow',
    flex = false

  export let style = ''
</script>

<style type="text/scss">
  @use 'config/spacing';
  @use 'config/layout_width';
  @use 'config/breakpoints';

  // default values
  $gutter: spacing.get('xnarrow');
  $breakpoint: 600px;
  $min-percentage: 33.33333%;
  $max-percentage: 100%;

  .gallery {
    --gutter: var(--space-xnarrow, #{$gutter});
    --min-width: 240px;
    --breakpoint: #{$breakpoint};
    --min-percentage: #{$min-percentage};
    --max-percentage: #{$max-percentage};

    display: block;
    font-size: 0;
    list-style: none;
    margin: (($gutter / 2) * -1);
    margin: calc((var(--gutter) / 2) * -1);
    padding-left: 0;
    position: relative;
    text-align: left;

    @supports (display: grid) and (display: flex) {
      display: grid;
      grid-column-gap: var(--gutter);
      grid-row-gap: var(--gutter);
      grid-template-columns: 1fr;
      margin: 0;

      @include breakpoints.query('>xsmall') {
        grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
      }
    }
  }

  .small {
    --min-width: 180px;
    --breakpoint: 480px;
    --min-percentage: 25%;
  }

  .large {
    --min-width: 600px;
    --breakpoint: 1200px;
    --min-percentage: 25%;

    @include breakpoints.query('>xsmall') {
      grid-template-columns: 1fr;
    }

    @include breakpoints.query('>small') {
      grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
    }
  }

  .gallery :global(li) {
    display: inline-block;
    font-size: 1rem;
    margin: 0; // overrule default li spacing
    padding: ($gutter / 2);
    padding: calc(var(--gutter) / 2);
    position: relative;
    vertical-align: top;


    // fallback fluid sizing method using a calc() hack
    // -> allows grid to be somewhat responsive without media queries
    // -> mainly for IE and old browsers
    // -> https://www.sitepoint.com/responsive-css-patterns-without-media-queries/
    max-width: $max-percentage;
    max-width: var(--max-percentage);
    min-width: $min-percentage;
    min-width: var(--min-percentage);
    width: calc((#{$breakpoint} - 100%) * 1000);
    width: calc((var(--breakpoint) - 100%) * 1000);

    @supports (display: grid) {
      max-width: layout_width.get();
      min-width: auto;
      padding: 0;
      width: auto;
    }
  }

  .large :global(li) {
    max-width: layout_width.get('wide');
  }

  .flex :global(li) {
    @supports (display: flex) {
      display: flex;
      flex-direction: column;
    }
  }
</style>

<ul
  class="gallery {size}"
  class:flex
  style="--gutter: var(--space-{gutter}); {style}"
>
  <slot {size}>Add list items here</slot>
</ul>
