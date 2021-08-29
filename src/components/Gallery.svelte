<script>
  export let size = ''
  export let gutter = 'xnarrow'
  export let flex = false
  export let alignCenter
  export let justifyCenter

  $: style = `--gutter: var(--space-${gutter});`
</script>

<ul
  class="gallery {size}"
  class:alignCenter
  class:flex
  class:justifyCenter
  {style}
>
  <slot {size}>Add list items here</slot>
</ul>

<style>
  .gallery {
    /* default values */
    --gutter: var(--space-xnarrow);
    --min-width: 300px;
    --breakpoint: 600px;
    --min-percentage: 33.33333%;
    --max-percentage: 100%;

    display: block;
    font-size: 0;
    margin: -1px;
    margin: calc((var(--gutter) / 2) * -1);
    padding-left: 0;
    position: relative;
    text-align: left;
  }

  @supports (display: grid) and (display: flex) {
    .gallery {
      display: grid;
      grid-column-gap: var(--gutter);
      grid-row-gap: var(--gutter);
      grid-template-columns: 1fr;
      margin: 0;
    }

    @media screen and (min-width: 30em) {
      .gallery {
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
  }

  @media screen and (min-width: 30em) {
    .large {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (min-width: 42em) {
    .large {
      grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
    }
  }

  .gallery :global(li) {
    display: inline-block;
    font-size: 1rem;
    margin: 0; /* overrule default li spacing */
    padding: calc(var(--gutter) / 2);
    position: relative;
    vertical-align: top;

    /* fallback fluid sizing method using a calc() hack
      -> allows grid to be somewhat responsive without media queries
      -> mainly for IE and old browsers
      -> https://www.sitepoint.com/responsive-css-patterns-without-media-queries/
    */
    max-width: var(--max-percentage);
    min-width: var(--min-percentage);
    width: calc((var(--breakpoint) - 100%) * 1000);
  }
  
  @supports (display: grid) {
    .gallery :global(li) {
      max-width: var(--content-width-default);
      min-width: auto;
      padding: 0;
      width: auto;
    }
  }

  .large :global(li) {
    max-width: var(--content-width-wide);
  }

  @supports (display: flex) {
    .flex :global(li) {
      display: flex;
      flex-direction: column;
    }
  }

  .alignCenter {
    align-items: center;
  }

  .justifyCenter {
    justify-content: center;
  }
</style>
