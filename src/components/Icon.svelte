<script>
  import icons from '@/utils/icons.js'

  export let id,
    size = '',
    margin = '',
    title = '',
    role = 'presentation'

  let classes = ''
  export { classes as class }

  $: generateIcon = `
    <svg
      viewbox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${(role !== 'presentation' && title)
        ? `<desc>${title}</desc>`
        : ''
      }
      ${icons[id]}
    </svg>
  `
</script>

<style lang="scss">
  .icon {
    $size: 1em;
    --icon-size: #{$size};

    color: inherit;
    display: inline-block;
    fill: currentColor !important;
    height: $size;
    height: var(--icon-size);
    margin-top: -0.15em; /* scooch up a little on the baseline */
    max-height: 100%;
    max-width: 100%;
    pointer-events: none;
    vertical-align: middle;
    width: $size;
    width: var(--icon-size);

    :global(svg) {
      display: block;
      fill: currentColor !important;
      margin: 0;
      max-height: 100%;
      width: 100%;
      vertical-align: top;
    }
  }

  .small {
    --icon-size: 0.83em;
  }

  .large {
    --icon-size: 1.2em;
  }

  .space-right {
    margin-right: 0.25em;
  }

  .space-left {
    margin-left: 0.25em;
  }
</style>

<span
  class="
    icon
    {classes}
    {size}
    {margin ? `space-${margin}` : ''}
  "
>
  {@html generateIcon}
</span>
