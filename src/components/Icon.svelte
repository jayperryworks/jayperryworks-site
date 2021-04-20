<script>
  export let svg,
    size = '',
    margin = ''

  let classes = ''
  export { classes as class }

  let marginClass = margin ? `space-${margin}` : ''
</script>

<span class="icon {size} {marginClass} {classes}">
  {@html svg}
</span>

<style>
  .icon {
    --icon-size: 1em;

    color: inherit;
    display: inline-block;
    fill: currentColor !important;
    height: 1em;
    height: var(--icon-size);
    margin-top: -0.15em; /* scooch up a little on the baseline */
    max-height: 100%;
    max-width: 100%;
    pointer-events: none;
    vertical-align: middle;
    width: 1em;
    width: var(--icon-size);
  }

  .icon :global(svg) {
    display: block;
    fill: currentColor !important;
    margin: 0;
    max-height: 100%;
    width: 100%;
    vertical-align: top;
  }

  .small {
    --icon-size: 0.7em;
  }

  .large {
    --icon-size: 1.44em;
  }

  .xlarge {
    --icon-size: 2.07em;
  }

  .space-right {
    margin-right: 0.25em;
  }

  .space-left {
    margin-left: 0.25em;
  }
</style>
